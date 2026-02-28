export type CommentProps = {
  ticketId: string;
  onCommentAdd:()=>void;
};

export type AddCommentFormValues = {
  body: string;
};
export type ViewCommentsProps = {
  comments: ViewCommentValues[];
};
export type ViewCommentValues = {
  comment: string
  commenter: string
  createdAt: string
}