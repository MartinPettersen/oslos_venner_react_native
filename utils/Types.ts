type Replie = {
    postId: string,
    reply: string,
    userName: string,
    parentId: string,
    createdAt: string,
    updatedAt: string,
    children: string[]
}

type Thread = {
    id: string,
    headline: string,
    userName: string,
    content: string,
    forumLabel: string,
    replies: string[],
    createdBy: string,
    createdAt: string,
    updatedAt: string,
}