export type CommentProps = {
  ticketId: string;
};

export type AddCommentFormValues = {
  body: string;
};
export type ViewCommentValues = {
  comment: string
  commenter: string
  createdAt: string
}