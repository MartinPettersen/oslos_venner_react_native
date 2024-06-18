export type Replie = {
    postId: string,
    reply: string,
    userName: string,
    parentId: string,
    createdAt: string,
    updatedAt: string,
    children: string[]
}

export type Thread = {
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

export interface Report {
    createdAt: string;
    report: string;
    reportId: string;
    subjectId: string;
    updatedAt: string;
    userName: string;
  }