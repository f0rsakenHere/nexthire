"use client";

import { useState, useRef, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  FileTextIcon,
  BriefcaseIcon,
  BuildingIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  RotateCcwIcon,
  MessageSquareIcon,
  SendIcon,
  CameraIcon,
  VideoIcon,
  MicIcon,
  MicOffIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "lucide-react";

interface Question {
  id: string;
  question: string;
  category: string;
}

interface Review {
  score: number;
  feedback: string;
  improvement: string;
}

export default function VideoInteractionPage() {
  const [user] = useAuthState(auth);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [jobDesc, setJobDesc] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const stepTimerRef = useRef<NodeJS.Timeout | null>(null);

  const GEN_STEPS = [
    "Analysing role & company...",
    "Crafting tailored questions...",
    "Calibrating difficulty levels...",
    "Finalising your interview set...",
  ];

  const EVAL_STEPS = [
    "Reading your answers...",
    "Evaluating depth & accuracy...",
    "Scoring each response...",
    "Writing personalised feedback...",
    "Compiling your results...",
  ];

  function startStepper(steps: string[], intervalMs = 4000) {
    setStepIndex(0);
    let i = 0;
    stepTimerRef.current = setInterval(() => {
      i = Math.min(i + 1, steps.length - 1);
      setStepIndex(i);
    }, intervalMs);
  }

  function stopStepper() {
    if (stepTimerRef.current) clearInterval(stepTimerRef.current);
  }

  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [evaluations, setEvaluations] = useState<Review[] | null>(null);

  // Current question index (one at a time)
  const [currentQ, setCurrentQ] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const lobbyVideoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [recordingIndex, setRecordingIndex] = useState<number | null>(null);
  const [transcribing, setTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Start camera immediately for the lobby preview
  useEffect(() => {
    if (!questions) {
      startCamera(lobbyVideoRef);
    }
    return () => {
      stopCameraImmediate();
      mediaRecorderRef.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When interview starts, move stream to main video ref
  useEffect(() => {
    if (questions && !evaluations && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    } else if (!questions && !evaluations && stream && lobbyVideoRef.current) {
      lobbyVideoRef.current.srcObject = stream;
    }
  }, [questions, evaluations, stream]);

  const startCamera = async (
    ref?: React.RefObject<HTMLVideoElement | null>,
  ) => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: true,
      });
      setStream(mediaStream);
      setCameraReady(true);
      setCameraError(false);
      const targetRef = ref ?? videoRef;
      if (targetRef.current) {
        targetRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Failed to access camera/mic", err);
      setCameraError(true);
    }
  };

  const stopCameraImmediate = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const toggleRecording = (index: number) => {
    if (recordingIndex === index) {
      // Stop recording — triggers onstop which sends audio to Groq
      mediaRecorderRef.current?.stop();
      setRecordingIndex(null);
    } else {
      if (recordingIndex !== null) {
        mediaRecorderRef.current?.stop();
      }

      if (!stream) {
        setError(
          "Camera/microphone not ready. Please allow access and try again.",
        );
        return;
      }

      // Use only the audio track so the blob is smaller & faster to transcribe
      const audioTrack = stream.getAudioTracks()[0];
      if (!audioTrack) {
        setError("No microphone detected.");
        return;
      }

      const audioStream = new MediaStream([audioTrack]);
      audioChunksRef.current = [];

      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : "audio/mp4";

      const recorder = new MediaRecorder(audioStream, { mimeType });

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: mimeType });
        if (blob.size < 1000) return; // silence / too short, skip

        setTranscribing(true);
        try {
          const form = new FormData();
          form.append("audio", blob, "recording.webm");

          const res = await fetch("/api/transcribe", {
            method: "POST",
            body: form,
          });
          const data = await res.json();

          if (data.transcript) {
            setAnswers((prev) => ({
              ...prev,
              [index]: ((prev[index] || "") + " " + data.transcript).trim(),
            }));
          } else if (data.error) {
            setError("Transcription error: " + data.error);
          }
        } catch (err) {
          console.error("Transcription failed", err);
          setError("Could not reach the transcription service.");
        } finally {
          setTranscribing(false);
        }
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setRecordingIndex(index);
    }
  };

  async function handleGenerate() {
    if (!role.trim()) {
      setError("Please enter a target role.");
      return;
    }
    setError(null);
    setLoading(true);
    startStepper(GEN_STEPS, 3500);

    try {
      const res = await fetch("/api/video-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate",
          role,
          company,
          jobDescription: jobDesc,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error)
        throw new Error(data.error ?? "Failed to generate questions");
      setQuestions(data.questions);
      setAnswers({});
      setEvaluations(null);
      setCurrentQ(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      stopStepper();
      setLoading(false);
    }
  }

  async function handleEvaluate() {
    if (!questions) return;
    const allAnswered = questions.every(
      (_, i) => answers[i]?.trim().length > 5,
    );
    if (!allAnswered) {
      setError("Please provide an answer to all questions before submitting.");
      return;
    }

    setError(null);
    setLoading(true);
    startStepper(EVAL_STEPS, 5000);

    const qna = questions.map((q, i) => ({
      question: q.question,
      answer: answers[i] || "",
    }));

    try {
      const res = await fetch("/api/video-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "evaluate",
          role,
          company,
          interviewType: "video",
          userId: user?.uid ?? null,
          qna,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error)
        throw new Error(data.error ?? "Failed to evaluate answers");
      setEvaluations(data.reviews);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      stopStepper();
      setLoading(false);
    }
  }

  function reset() {
    setRole("");
    setCompany("");
    setJobDesc("");
    setQuestions(null);
    setAnswers({});
    setEvaluations(null);
    setError(null);
    setCurrentQ(0);
  }

  const isLastQuestion = questions ? currentQ === questions.length - 1 : false;
  const allAnswered = questions
    ? questions.every((_, i) => answers[i]?.trim().length > 5)
    : false;

  // \u2500\u2500 Stepper Overlay \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  const currentSteps = !questions ? GEN_STEPS : EVAL_STEPS;
  const StepperOverlay = loading ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-md">
      <div className="relative w-full max-w-[360px] mx-4 bg-background border border-border/60 shadow-[0_8px_40px_rgba(0,0,0,0.10)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Top gradient accent */}
        <div className="h-0.5 w-full bg-gradient-to-r from-primary via-blue-500 to-indigo-500" />

        <div className="px-8 pt-8 pb-7 flex flex-col items-center gap-6">
          {/* Spinner */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl scale-150" />
            <svg
              className="size-14 -rotate-90 animate-spin"
              style={{ animationDuration: "1.4s" }}
              viewBox="0 0 64 64"
            >
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.08"
                strokeWidth="3"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="url(#wring-grad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="60 120"
              />
              <defs>
                <linearGradient
                  id="wring-grad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="oklch(0.62 0.26 278)" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <VideoIcon className="size-5 text-primary/60" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-primary mb-1">
              {!questions ? "Generating Interview" : "Analysing Performance"}
            </p>
            <p className="text-muted-foreground text-xs">
              Please wait a moment…
            </p>
          </div>

          {/* Steps */}
          <div className="w-full flex flex-col gap-2">
            {currentSteps.map((step, i) => (
              <div
                key={step}
                className={`flex items-center gap-3 transition-all duration-500 ${
                  i < stepIndex
                    ? "opacity-30"
                    : i === stepIndex
                      ? "opacity-100"
                      : "opacity-20"
                }`}
              >
                <div
                  className={`size-5 shrink-0 flex items-center justify-center text-[9px] font-bold font-mono border transition-all duration-300 ${
                    i < stepIndex
                      ? "bg-emerald-50 border-emerald-300 text-emerald-600"
                      : i === stepIndex
                        ? "border-primary/50 bg-primary/5 text-primary"
                        : "border-border/40 text-muted-foreground/30"
                  }`}
                >
                  {i < stepIndex ? (
                    <svg
                      className="size-2.5 text-emerald-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : i === stepIndex ? (
                    <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>

                <span
                  className={`text-xs font-mono ${
                    i === stepIndex
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground/50"
                  }`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background text-foreground min-h-screen">
        {/* Stepper overlay — shown during AI generation & evaluation */}
        {StepperOverlay}
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground transition-colors" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 bg-border"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    href="/dashboard"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-muted-foreground/20" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-foreground/80 text-sm">
                    Real-time Video Interaction
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-4 flex items-center gap-2">
            {stream && (
              <>
                <span className="size-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-rose-500 font-bold">
                  Camera Live
                </span>
              </>
            )}
            {!stream && questions && (
              <>
                <span className="size-1.5 rounded-full bg-muted-foreground" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Camera Off
                </span>
              </>
            )}
            {!questions && (
              <>
                <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  AI Interviewer Online
                </span>
              </>
            )}
          </div>
        </header>

        {/* ── SETUP / LOBBY ── */}
        {!questions && (
          <div className="flex h-[calc(100vh-56px)] overflow-hidden">
            {/* LEFT: Live camera preview */}
            <div className="relative flex-1 bg-zinc-950 flex items-center justify-center overflow-hidden">
              <video
                ref={lobbyVideoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover scale-x-[-1]"
              />

              {/* Camera not ready overlay */}
              {!cameraReady && !cameraError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/50">
                  <div className="size-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <CameraIcon className="size-7 opacity-60" />
                  </div>
                  <p className="text-sm font-mono tracking-widest uppercase">
                    Requesting camera access...
                  </p>
                </div>
              )}

              {/* Camera error overlay */}
              {cameraError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/60 px-8 text-center">
                  <div className="size-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
                    <AlertTriangleIcon className="size-7 text-rose-400" />
                  </div>
                  <p className="text-sm font-mono uppercase tracking-widest text-rose-400">
                    Camera blocked
                  </p>
                  <p className="text-xs text-white/40 max-w-[240px]">
                    Please allow camera access in your browser and refresh the
                    page to use video interview mode.
                  </p>
                </div>
              )}

              {/* Camera status pill */}
              {cameraReady && (
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur px-3 py-1.5 border border-white/10">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest">
                    Camera ready
                  </span>
                </div>
              )}

              {/* Name/role tag at bottom */}
              {role && (
                <div className="absolute bottom-5 left-5 bg-black/60 backdrop-blur px-4 py-2 border border-white/10">
                  <p className="text-white font-semibold text-sm">{role}</p>
                  {company && (
                    <p className="text-white/50 text-xs">{company}</p>
                  )}
                </div>
              )}

              {/* Mic indicator */}
              {cameraReady && (
                <div className="absolute bottom-5 right-5 flex items-center gap-2">
                  <div className="size-9 bg-black/60 backdrop-blur border border-white/10 flex items-center justify-center">
                    <MicIcon className="size-4 text-white/70" />
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Settings panel */}
            <div className="w-[400px] shrink-0 bg-background border-l border-border/50 flex flex-col h-full overflow-y-auto">
              {/* Panel header */}
              <div className="px-8 pt-8 pb-6 border-b border-border/40">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">
                  Interview Practice
                </p>
                <h1 className="text-2xl font-black tracking-tight text-foreground">
                  Ready to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                    Join?
                  </span>
                </h1>
                <p className="text-muted-foreground text-xs mt-1.5">
                  Configure your session then start. AI will evaluate your
                  spoken answers.
                </p>
              </div>

              <div className="px-8 py-6 flex flex-col gap-5 flex-1">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <BriefcaseIcon className="size-3.5 text-primary/70" />
                    Target Role <span className="text-rose-500">*</span>
                  </label>
                  <input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Frontend Engineer"
                    className="w-full bg-muted/30 border border-border/50 rounded-none px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <BuildingIcon className="size-3.5 text-primary/70" />
                    Company{" "}
                    <span className="text-muted-foreground/50 font-normal normal-case">
                      (optional)
                    </span>
                  </label>
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Google, Stripe"
                    className="w-full bg-muted/30 border border-border/50 rounded-none px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <FileTextIcon className="size-3.5 text-primary/70" />
                    Job Description{" "}
                    <span className="text-muted-foreground/50 font-normal normal-case">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                    placeholder="Paste the job description for tailored questions..."
                    style={{ minHeight: "120px" }}
                    className="w-full bg-muted/30 border border-border/50 rounded-none px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors resize-none"
                  />
                </div>

                {/* Device status */}
                <div className="flex flex-col gap-2 p-4 bg-muted/20 border border-border/40">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                    Devices
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <CameraIcon className="size-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground text-xs">
                        Camera
                      </span>
                    </div>
                    {cameraReady ? (
                      <span className="text-emerald-600 text-xs font-medium flex items-center gap-1">
                        <CheckCircleIcon className="size-3" /> Ready
                      </span>
                    ) : cameraError ? (
                      <span className="text-rose-500 text-xs font-medium flex items-center gap-1">
                        <AlertTriangleIcon className="size-3" /> Blocked
                      </span>
                    ) : (
                      <span className="text-amber-500 text-xs font-medium">
                        Requesting...
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <MicIcon className="size-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground text-xs">
                        Microphone
                      </span>
                    </div>
                    {cameraReady ? (
                      <span className="text-emerald-600 text-xs font-medium flex items-center gap-1">
                        <CheckCircleIcon className="size-3" /> Ready
                      </span>
                    ) : cameraError ? (
                      <span className="text-rose-500 text-xs font-medium flex items-center gap-1">
                        <AlertTriangleIcon className="size-3" /> Blocked
                      </span>
                    ) : (
                      <span className="text-amber-500 text-xs font-medium">
                        Requesting...
                      </span>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2.5 px-4 py-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm">
                    <AlertTriangleIcon className="size-4 shrink-0 text-rose-500" />
                    {error}
                  </div>
                )}
              </div>

              {/* Join button pinned to bottom */}
              <div className="px-8 pb-8">
                <button
                  onClick={handleGenerate}
                  disabled={loading || !role.trim()}
                  className="relative w-full flex items-center justify-center gap-2.5 px-7 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-none text-white text-sm font-bold shadow-[0_0_30px_oklch(0.55_0.25_270/0.4)] hover:shadow-[0_0_45px_oklch(0.55_0.25_270/0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span className="font-medium tracking-wide">
                        Generating questions...
                      </span>
                    </>
                  ) : (
                    <>
                      <VideoIcon className="size-5" />
                      Join Interview
                    </>
                  )}
                </button>
                <p className="text-center text-[10px] text-muted-foreground/50 font-mono mt-3">
                  Transcribed by Groq Whisper · Evaluated by AI
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── VIDEO INTERVIEW ROOM ── */}
        {questions && !evaluations && (
          <div className="flex flex-col h-[calc(100vh-56px)]">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-border/30 bg-background/60 backdrop-blur shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  Question
                </span>
                <div className="flex items-center gap-1">
                  {questions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentQ(i)}
                      className={`size-6 text-[10px] font-bold transition-all ${
                        i === currentQ
                          ? "bg-primary text-primary-foreground"
                          : answers[i]?.trim().length > 5
                            ? "bg-emerald-500/20 text-emerald-600 border border-emerald-500/30"
                            : "bg-muted/50 text-muted-foreground border border-border/50 hover:border-primary/40"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
              >
                <RotateCcwIcon className="size-3" /> End Session
              </button>
            </div>

            {/* Main interview layout */}
            <div className="flex flex-1 overflow-hidden">
              {/* Left: Video feed — always visible */}
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-x-[-1]"
                />

                {!stream && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 gap-3">
                    <CameraIcon className="size-10 opacity-40" />
                    <span className="text-sm font-mono tracking-widest uppercase">
                      Waiting for camera permission...
                    </span>
                  </div>
                )}

                {/* Recording pill overlay */}
                {recordingIndex === currentQ && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/70 backdrop-blur-md border border-white/10 px-4 py-2 shadow-lg rounded-full">
                    <div className="size-2 rounded-full bg-rose-500 animate-pulse" />
                    <span className="text-xs font-mono text-white tracking-widest uppercase font-bold">
                      Listening...
                    </span>
                  </div>
                )}

                {/* Bottom-left: current question label */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-10">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary/80 mb-1 block">
                    {questions[currentQ]?.category}
                  </span>
                  <p className="text-white font-semibold text-sm md:text-base leading-snug max-w-lg">
                    {questions[currentQ]?.question}
                  </p>
                </div>
              </div>

              {/* Right panel: answer input */}
              <div className="w-80 xl:w-96 shrink-0 border-l border-border/50 bg-background flex flex-col h-full">
                {/* Panel header */}
                <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-primary/70">
                      Your Answer
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Type or speak your response
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground/50">
                    {(answers[currentQ] || "").length} chars
                  </span>
                </div>

                {/* Answer textarea */}
                <textarea
                  value={answers[currentQ] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQ]: e.target.value,
                    }))
                  }
                  placeholder="Speak using the mic button below, or type here..."
                  className="flex-1 w-full bg-transparent px-5 py-4 text-sm text-foreground focus:outline-none resize-none leading-relaxed"
                />

                {/* Mic button */}
                <div className="px-5 py-4 border-t border-border/50 flex flex-col gap-3">
                  <button
                    onClick={() => toggleRecording(currentQ)}
                    disabled={transcribing}
                    className={`w-full flex items-center justify-center gap-2.5 py-3 font-bold text-sm transition-all ${
                      transcribing
                        ? "bg-amber-500/10 text-amber-600 border border-amber-400/30 cursor-wait"
                        : recordingIndex === currentQ
                          ? "bg-rose-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                          : "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
                    }`}
                  >
                    {transcribing ? (
                      <>
                        <span className="size-4 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                        Processing...
                      </>
                    ) : recordingIndex === currentQ ? (
                      <>
                        <MicOffIcon className="size-4" />
                        Stop &amp; Save
                      </>
                    ) : (
                      <>
                        <MicIcon className="size-4" />
                        {answers[currentQ]?.trim().length > 5
                          ? "Record More"
                          : "Start Recording"}
                      </>
                    )}
                  </button>

                  {/* Prev / Next navigation */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentQ((q) => Math.max(q - 1, 0))}
                      disabled={currentQ === 0}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-mono border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronLeftIcon className="size-3.5" /> Prev
                    </button>

                    {!isLastQuestion && (
                      <button
                        onClick={() =>
                          setCurrentQ((q) =>
                            Math.min(q + 1, (questions?.length ?? 1) - 1),
                          )
                        }
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-mono border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                      >
                        Next <ChevronRightIcon className="size-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Submit — only on last question, big prominent CTA */}
                  {isLastQuestion && (
                    <button
                      onClick={handleEvaluate}
                      disabled={loading || !allAnswered || transcribing}
                      className="w-full relative flex items-center justify-center gap-3 py-4 font-bold text-sm bg-gradient-to-r from-primary to-blue-600 text-white shadow-[0_0_24px_oklch(0.62_0.26_278/0.35)] hover:shadow-[0_0_36px_oklch(0.62_0.26_278/0.55)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                      {loading ? (
                        <>
                          <span className="size-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          <span className="font-mono text-xs tracking-widest uppercase">
                            Analysing with AI...
                          </span>
                        </>
                      ) : (
                        <>
                          <SendIcon className="size-4" />
                          Submit All Answers
                        </>
                      )}
                    </button>
                  )}

                  {error && (
                    <div className="flex items-start gap-2 px-3 py-2 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-none">
                      <AlertTriangleIcon className="size-3.5 shrink-0 mt-0.5" />
                      {error}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── RESULTS ── */}
        {evaluations && questions && (
          <div className="p-6 lg:p-8 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">
                  Interview Complete
                </p>
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-foreground">
                  Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                    Feedback
                  </span>
                </h1>
                <p className="text-muted-foreground text-sm mt-1.5">
                  Review your performance and how to improve each answer.
                </p>
              </div>
              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
              >
                <RotateCcwIcon className="size-3" /> New Session
              </button>
            </div>

            {/* Overall banner */}
            <div className="rounded-none bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 p-8 flex flex-col items-center text-center">
              <div className="size-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <CheckCircleIcon className="size-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Great job!</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-lg">
                The AI has reviewed your {questions.length} responses below.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {questions.map((q, i) => {
                const review = evaluations[i];
                const scoreColor =
                  review.score >= 8
                    ? "text-emerald-600 bg-emerald-50 border-emerald-200"
                    : review.score <= 4
                      ? "text-rose-600 bg-rose-50 border-rose-200"
                      : "text-amber-500 bg-amber-50 border-amber-200";

                return (
                  <div
                    key={i}
                    className="rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm overflow-hidden"
                  >
                    <div className="p-6 md:p-8 border-b border-border/50 bg-muted/20">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary/70 mb-2 flex items-center gap-1.5">
                            <MessageSquareIcon className="size-3" />
                            Question {i + 1} • {q.category}
                          </span>
                          <h3 className="text-lg font-medium text-foreground leading-snug">
                            {q.question}
                          </h3>
                        </div>
                        <div
                          className={`shrink-0 flex flex-col items-center justify-center size-14 border ${scoreColor}`}
                        >
                          <span className="text-xl font-bold leading-none">
                            {review.score}
                          </span>
                          <span className="text-[9px] font-mono uppercase font-bold mt-0.5">
                            / 10
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col gap-6">
                      <div>
                        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
                          Your Answer
                        </p>
                        <div className="p-4 bg-muted/40 text-foreground/80 text-sm leading-relaxed italic font-light">
                          &quot;{answers[i]}&quot;
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-xs font-mono uppercase tracking-widest text-emerald-600 mb-3">
                            Feedback
                          </p>
                          <p className="text-sm text-foreground/80 leading-relaxed">
                            {review.feedback}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-mono uppercase tracking-widest text-blue-600 mb-3">
                            How to Improve
                          </p>
                          <p className="text-sm text-foreground/80 leading-relaxed">
                            {review.improvement}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
