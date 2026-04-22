export interface CourseItem {
  id: string;
  title: string;
  type: "video" | "article" | "quiz" | "resource";
  duration: string;
  isPreview: boolean;
  isGhost?: boolean;
}

export interface CourseSection {
  id: string;
  title: string;
  itemCount: number;
  duration: string;
  items: CourseItem[];
}
