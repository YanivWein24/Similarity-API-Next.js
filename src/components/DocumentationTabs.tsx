"use client";

import { nodejs, python, bash } from "@/helpers/documentation-code";
import SimpleBar from "simplebar-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/Tabs";
import Code from "./Code";

export default function DocumentationTabs() {
  return (
    <Tabs defaultValue="nodejs" className="max-w-2xl w-full">
      <TabsList>
        <TabsTrigger value="nodejs">NodeJS</TabsTrigger>
        <TabsTrigger value="python">Python</TabsTrigger>
        <TabsTrigger value="bash">Bash</TabsTrigger>
      </TabsList>
      <TabsContent value="nodejs">
        <SimpleBar>
          <Code language="javascript" code={nodejs} show animated />
        </SimpleBar>
      </TabsContent>
      <TabsContent value="python">
        <SimpleBar>
          <Code language="python" code={python} show animated />
        </SimpleBar>
      </TabsContent>
      <TabsContent value="bash">
        <SimpleBar>
          <Code language="bash" code={bash} show animated />
        </SimpleBar>
      </TabsContent>
    </Tabs>
  );
}
