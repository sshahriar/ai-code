var e=`# Building a SaaS Platform Claude Code Skills & Claude.md Setup

> Week 2 · Day 5

## Overview

You know that I'm a hands-on type. I like building stuff and that means I like Blue Days the most.

Blue Days, Building Days, welcome to the culmination of Week 2. Welcome to Week 2, Day 5.

Let's get cracking. This is the day that we're going to build out a SaaS platform.

## You will learn

- Understand the main ideas covered in **Building a SaaS Platform Claude Code Skills & Claude.md Setup**
- Follow the practical walkthrough from Week 2, Day 5
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

I'm working on one that is going to be a legal document draft up or pre-legal that we started yesterday. You might be working on that too or you might be going in a totally different direction, maybe inspired by the idea of having some template documents, having an AI chat that lets you add commercial value. That's what we're doing.

Let's get into it. And don't hate me, but repetition is important sometimes. And we're going to repeat for one more time the mcp skills, plugins stuff.

Just at a high level, there are these three ways to give Claude capabilities. You're pretty familiar with MCP now, the way to stitch together models and tools, skills, which are just these text files, these markdown files that allow you to add in information to Claude in a way that is progressive and which is efficient, use of context, and then plugins, which is a sort of package of all of the above and other stuff too, like agents that you're now getting a good handle on. And all of this together, it has pros and cons.

And the pros for MCP is again, about the adoption, the ecosystem, the flexibility, the con is that it can be something that use up lots of context, and then they can be complex. And we saw the Jira one can do things like losing its authentication and stuff stuff which is really annoying skills simpler easier very efficient with the context maybe less powerful and plugins some something of the best of both very easy to set up, but they are strictly for clawed code That is that is the lay of land and when you're looking for new functionality Of course the first place to start is with plugins And you go for things like mcp when you want to get very detailed and specific as we did with lassians jira and and with the github 1-2. All right and then the other thing to recap is going to be the thing that we built yesterday which began by reading in a jira issue using the at lassian mcp.

And based on a Jira issue that had been written and was out there on Jira, we then used the feature dev plugin which took us through the seven step process, step six, which was skipped. And that then was used to create a PR using the GitHub MCP server. All of this running in cycloid code all kicked off by that one command that command is part of the feature dev plugin, we just said implement Jura issue PL3 with an XGS app in a directory called frontend, raise a PL when you're done, that's it, go do it, and it went and did it.

And so the thing that's missing from here that you might be like, "Eh, do you say that we were gonna do skills?" We didn't use a skill, so we'll make up for that today and recap a reminder on how skills fit into the picture. They can be included in plugins, of course. But basically it's this idea of having a metadata which describes at some very simple level what this skill is about and that always gets read into context.

And then progressively the model decides, do I need, do I need to use this? And if so, then it reads in the instructions. And in reading the instructions, there are references potentially to other files and even to scripts that can be run.

And only if it needs to, the model decides to read them in as well. So there's this sort of three level of depth of information that the model can read. It always reads the top, the metadata, and it chooses what else to read in.

And the metadata and the instructions all sit together in one file called skill.md together. The metadata's at the top. You may remember it has like a special way of symbolizing it with some hyphens that we will do in a second.

So you've got that. And yeah, they're implemented using this fancy thing called a file system architecture, which is just saying, A is just use folders with a particular name. And so the structure is shown right there.

You have a dot-clawed in your home directory and you also have one in your project directory. And if in there you put a skill with this kind of folder structure, then lo and behold, that will be a skill that Claude Code can use. That's all there is to it.

### Deep dive

Okay, so here I am back in VS Code, back in the pre-legal repo. It's time for us to get on with today's project. I'm just gonna do a quick git status to understand where things stand.

Check we're in branch main, and actually in submitting all the PRs, Cloud Code did not automatically submit the dot-clawed directory 'cause it felt like it wasn't actually associated with any of the work that it was doing. So let's just do a git add to bring that in and commit that the Claude settings and push that to the repo so that we have now made sure that we have everything consistently in our repo and that other people in the project will also be using the same plugin as us. All right, now in starting up our project for real work based on where we are with Prelegal, there's a few things we might want to do.

One of them is something that maybe we should have done yesterday, but I thought we'd write until the real project kicked off. And what is that? What do you normally do at the start of a project like this?

You normally make a good claw.md file. But first, there's something that I've not even mentioned to you, which is that there's more than one Claude.md file. And I'm not referring to the fact that you can have many of them in different subfolders.

I'm saying that not only is there one in your project directory, but you can have a Claude.md file somewhere completely different. And you probably already guessed this. You know the way that there's this.claud folder right here, which is where you have settings and you remember I told you you can have skills in here as well and that you can also have skills in your home directory.

Well you can also have a claud.md file in your home directory and that means it's not associated with any project, it's associated with you the user, it's for your work with claud and of course I have one in my home directory and you should too. And it's something which should, should tighter to your style and to what matters for you and your working with Claude Code. And back in the day, there was always people all had the sort of the Claude.md that you should have.

And of course, anthropic has been catching up, and it's been incorporating common things already in Opus. So there's less needs to have something that's boilerplate. Nonetheless, I have some things that are my pet peeves, and so I will show you right now.

I have just gone to VS Code, to New Window, and then I did like an open, and then I just opened in my home directory, and this is what I see. So this is my entire home directory. There's lots of dot folders in here.

There's one called dot-clawed, and this contains all of Claude's own folder structure that you shouldn't touch. There has lots of things that are the stuff that it looks at like it's telemetry. It's got some project information that it stores lots of stuff and then it has a claud.md and that's what we're looking at right here and I've just got a few instructions in here and if you Google you'll find that people have all sorts of tips about things to put in here.

As I say, generally speaking, anthropic has added a lot of this in by default. So you should just use this to add in extra nuggets of information that you want to add to Claude's context every single time. So the key is to keep this super short and concise and make every word count because every token count, open a preview because this goes in every single context you ever have.

So I've just got like very important, be simple, approach to us in a simple incremental way, work incrementally, always small, simple steps. I know I'm repeating myself, but when you really want something to be remembered, that's not a terrible thing to do valid in check each increment before moving on use latest APIs as of now mandatory code style. Do not over engineer do not over-engineer, do not program defensively.

### Putting it together

You'll recognize some of this I've also been using in my cloud.md's within the project for your benefit. But I have this stuff in as the standard. UV as the Python package manager, always UV run never Python three, always UV add never pip install, favor clear, concise, doc string comments.

And by the way, that's because I love UV and it works really well for everything I do. And I recommend the same, but you may not. You might prefer to use a more vanilla Python and PIP.

Favor, concise, doc string comments, be sparing with comments outside doc strings, favor, short modules, important debugging and fixing and so on. All right, and I'm gonna add in here, a few things here. Why not?

Since we're here, let's come here and let's say, never, never use emojis. No emojis, or put it twice, no, never use emojis in code or in print statements. Print or log or log or print statements or logging.

Let's make that super clear because that causes problems on PCs and it causes nothing but trouble and and Cloud Code loves emojis and keep read me concise and avoid two men and clean up, up, old files. That will probably do. Maybe that's a bit, we won't, we'll just say, keep read me concise, that seems fine.

That's enough, that's enough. Two more things that we have added to the general-claud.md, a great practice to have. You don't need to copy what I've got here, you should do whatever matters to you.

Maybe you like emojis, maybe you like long readmes, in which case, keep it. But if you like me, then put it in here. And then I've got some important debugging stuff that's just again, the really key points here.

Always identify root calls before fixing. Prove the problem first. Don't guess.

Test one test at a time beam methodical. Don't jump to conclusion. Don't apply workarounds.

That sounds good.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

I'm working on one that is going to be a legal document draft up or pre-legal that we started yesterday. You might be working on that too or you might be going in a totally different direction, maybe inspired by the idea of having some template documents, having an AI chat that lets you add commercial value. That's what we're doing.

## Practical tips

- Let's get into it. And don't hate me, but repetition is important sometimes. And we're going to repeat for one more time the mcp skills, plugins stuff.
- And the pros for MCP is again, about the adoption, the ecosystem, the flexibility, the con is that it can be something that use up lots of context, and then they can be complex. And we saw the Jira one can do things like losing its authentication and stuff stuff which is really annoying skills simpler easier very efficient with the context maybe less powerful and plugins some something of the best of both very easy to set up, but they are strictly for clawed code That is that is the lay of land and when you're looking for new functionality Of course the first place to start is with plugins And you go for things like mcp when you want to get very detailed and specific as we did with lassians jira and and with the github 1-2. All right and then the other thing to recap is going to be the thing that we built yesterday which began by reading in a jira issue using the at lassian mcp.
- And so the thing that's missing from here that you might be like, "Eh, do you say that we were gonna do skills?" We didn't use a skill, so we'll make up for that today and recap a reminder on how skills fit into the picture. They can be included in plugins, of course. But basically it's this idea of having a metadata which describes at some very simple level what this skill is about and that always gets read into context.
- And only if it needs to, the model decides to read them in as well. So there's this sort of three level of depth of information that the model can read. It always reads the top, the metadata, and it chooses what else to read in.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

And let's also add reproduce consistently. Let's put that in there, keep it short and sharp, but that is the point. Okay, and with that, I've saved that file. That's given us a good claw.md in our home directory that will always get used.
`;export{e as default};