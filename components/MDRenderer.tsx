"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type MDRendererProps = {
  content: string;
};

export default function MDRenderer({ content }: MDRendererProps) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:font-semibold prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:text-primary/80">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw as any]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
