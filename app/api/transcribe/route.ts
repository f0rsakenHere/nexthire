import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const audioBlob = formData.get("audio") as Blob | null;

    if (!audioBlob) {
      return Response.json({ error: "No audio provided" }, { status: 400 });
    }

    // Convert Blob → File so Groq SDK accepts it
    const audioFile = new File([audioBlob], "recording.webm", {
      type: audioBlob.type || "audio/webm",
    });

    const transcription = await groq.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-large-v3-turbo", // fastest + most accurate Groq model
      response_format: "json",
      language: "en",
    });

    return Response.json({ transcript: transcription.text });
  } catch (err) {
    console.error("[transcribe] Error:", err);
    const message = err instanceof Error ? err.message : "Transcription failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
