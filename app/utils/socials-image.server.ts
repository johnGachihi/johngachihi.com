export function getSocialsImage(title: string, imageUrl: string): string {
  const encodedImageUrl = Buffer.from(imageUrl).toString("base64");
  return `https://res.cloudinary.com/retech/image/upload/c_fit,l_text:poppins_48_line_spacing_-5:${title},w_600,h_300/fl_layer_apply,g_north_west,x_68,y_136/l_fetch:${encodedImageUrl}/c_fill,fl_relative,w_0.4,h_1.0/fl_layer_apply,g_north_east/v1671890060/johngachihi.me/article-social-template_pqdjre.png`
}