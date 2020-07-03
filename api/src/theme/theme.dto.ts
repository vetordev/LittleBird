export class GetThemeDto {
  theme_id: number;
  theme_name: string;
  theme_img: {
    theme_img_id: number;
    img_url: string;
  }
}