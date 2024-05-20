import { createClient } from "@supabase/supabase-js";
import { url } from "inspector";

export async function uploadAvatar(image: File) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const data = await supabase.storage
    .from("avatars")
    .upload(`${image.name}_${Date.now()}`, image);
  console.log(data);
  const urlData = await supabase.storage
    .from("avatars")
    .getPublicUrl(data.data?.path!);

  return urlData.data?.publicUrl;
}

export async function UploadImages(images: File[]) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const data = await Promise.all(
    images.map((image) =>
      supabase.storage
        .from("PropertyImages")
        .upload(`${image.name}_${Date.now()}`, image)
    )
  );
  const urls = data.map(
    (item) =>
      supabase.storage
        .from("PropertyImages")
        .getPublicUrl(item.data?.path ?? "").data.publicUrl
  );
  return urls;
}
