// เพิ่มใน appRouter
community: router({
  getPosts: publicProcedure.query(async () => {
    const db = await getDb();
    return await db.select().from(posts).orderBy(desc(posts.createdAt));
  }),
  createPost: protectedProcedure
    .input(z.object({ title: z.string(), content: z.string(), category: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      await db.insert(posts).values({
        title: input.title,
        content: input.content,
        category: input.category,
        authorId: ctx.user.id
      });
      return { success: true };
    }),
}),
ai: router({
  chat: protectedProcedure
    .input(z.object({ message: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // เรียกใช้ invokeLLM ที่คุณมีอยู่ใน _core/llm.ts
      const response = await invokeLLM({
        messages: [{ role: "user", content: input.message }]
      });
      const aiReply = response.choices[0].message.content;
      
      // เก็บลง DB จริง (ไส้ในมาแล้ว!)
      const db = await getDb();
      await db.insert(aiMessages).values([
        { userId: ctx.user.id, role: "user", content: input.message },
        { userId: ctx.user.id, role: "assistant", content: aiReply }
      ]);
      
      return aiReply;
    }),
})
