namespace Api.Dto.Comment
{
    public class CommentDTO
    {
        public string Text { get; set; }
    }

    public class ResponseCommentDTO
    {
        public Guid Id { get; set; }

        public string Text { get; set; }

        public String UserId { get; set; }

        public Guid QuestionId { get; set; }
    }
}