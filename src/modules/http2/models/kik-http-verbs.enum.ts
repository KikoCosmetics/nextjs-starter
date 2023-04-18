export enum KikHttpVerbs {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH"
}

export type KikRestVerbsRef<T> = { [key in keyof typeof KikHttpVerbs]: T };