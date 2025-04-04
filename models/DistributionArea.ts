export type DistributionAreaNames =
  | 'דרום ת"א'
  | 'צפון ת"א'
  | "רמת גן-גבעתיים"
  | "בני ברק"
  | "פתח תקווה"
  | "רמת והוד השרון-רעננה-הרצליה"
  | "מודיעין ומושבים"
  | "רמלה-לוד והסביבה"
  | "ראשון-נס ציונה-רחובות"
  | "חולון-בת ים";

export interface DistributionArea {
  id: string;
  name: DistributionAreaNames;
}
