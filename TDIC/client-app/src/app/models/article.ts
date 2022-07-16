export interface Article {
    id_article: number;
    id_assy: number;

    title: string;
    short_description: string;
    long_description: string;
    meta_description: string;
    meta_category: string;

    status: number;

    directional_light_color: number;
    directional_light_intensity: number;
    directional_light_px: number;
    directional_light_py: number;
    directional_light_pz: number;

    ambient_light_color: number;
    ambient_light_intensity: number;

    gammaOutput: boolean;

    id_attachment_for_eye_catch: number;

    bg_c: number;
    bg_h: number;
    bg_s: number;
    bg_l: number;
    isStarrySky: boolean;
}