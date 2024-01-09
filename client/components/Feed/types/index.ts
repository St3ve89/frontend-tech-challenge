export interface Feed {
  briefref: string;
  brand: Brand;
  name: string;
  description: string;
  feed_title: string;
  banner_text: string;
  banner_image: string;
  ad_1_image: string;
  ad_2_image: string;
  starts_on: string;
}

interface Brand {
  name: string;
  logo: string;
}
