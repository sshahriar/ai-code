var e=`# Skills vs MCP Claude Code's Simpler Way to Add Abilities

> Week 2 · Day 3

## Overview

Okay, so hopefully mcp is now Super clear in your mind as at least as clear as it needs to be you've got enough of the gist of this So what are skills skills came after mcp skills was like a a newer innovation and The idea of skills is gonna be some green and some red some pros and some cons skills They are focused on Instructions that you can give focused on instructions that you can give cloud code, or now lots of others, it started as just a cloud code thing. Instructions as markdown files, so that it's not so much about connecting in tools, although as you'll see, it can be used to achieve that.

But it's more just having some instructions, some text, very much like cloud.md. We are familiar with claw.md already.

It's just a way to have instructions in Markdown that goes to an agent. So what's the difference with skills?

## You will learn

- Understand the main ideas covered in **Skills vs MCP Claude Code's Simpler Way to Add Abilities**
- Follow the practical walkthrough from Week 2, Day 3
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

Well, first up, you can have many of them. So it's like lots of claw.md's. So okay, it doesn't sound very innovative yet.

But first of all, they're very simple to construct. So anyone can make these things. They have built into them this thing called progressive disclosure, which sounds very fancy.

And what it's saying is very simple. It's just that they doesn't all get loaded into context. It doesn't all come in and fill up the context.

Just the very first part of it does, which has some information about when is the rest of it relevant. And the LLM just gets to decide, does it want to load in the rest or not? Otherwise it only loads in the very top part of it.

And when it loads in the rest, it loads in the rest of the document. But also there are other documents that it could, even more optionally, load in, should it wish to. So it can go to many levels of depth in terms of how much information it loads in.

And that idea is called progressive disclosure, and it means it's super efficient when it comes to the context window. And in addition to being able to load in markdown files, it's also possible to give it some scripts that it can run. So as part of this progressive disclosure, you can say, Hey, here are a few documents you could read.

Oh, and by the way, here's a couple of scripts that you can kick off. They're things that you can just run as shell scripts and get back results. And that is really very similar to giving it tools.

It's not tools in the same way that LLM's call tools currently that we've worked on. It's a different idea. It's an idea of saying you have the ability to kick off a shell script, to give you the name of the script.

I will run it and I will give you back the ability to kick off a shell script, to give you the name of the script, I will run it and I will give you back the result. But it achieves much the same thing as a tool, at a sort of higher level of granularity. And it's very easy to make these things and share them.

There's just a folder full of markdown files and some scripts. And that's it. It's sort of, there's a convention about how you put them all together and what you name them.

And then you're done. That's it. MCP servers are hard to build and share in some way other courses we do it.

And it's, you know, you need to code them and things with skills. It's just a bunch of files. That's it.

So that makes skills this very simple, accessible way to be building and sharing this kind of extra information to load in to an LLM. and it's loaded in in this very efficient way. So it ticks lots of the boxes that were sort of problems with MCP servers.

And I'll also say there's like an intangible that a lot of us that were working with MCP felt awkward about MCP, that something felt too complicated about the MCP set up for many use cases. The way for, if you understand how MCP works, the way that it like spawns a separate process and connects to it, that there's a lot of sort of infrastructure plumbing that comes with the MCP story. And that's a lot in, for many simple use cases, if you just wanna do something simple, it feels like you got a lot of overheads, a lot of technical complexity.

Well, skills feels very clean by comparison. It feels very simple and elegant and for typical simple use cases, it really fits the bill. And so that's why a lot of us, when skills first came out, had a sort of collective sigh of relief of this sort of feels right.

### Deep dive

But of course, there are some downsides and here they are, the obvious one is that by being more simplistic, we're giving up some of the power and flexibility of the sort of traditional tools. So when you're building tools, you're able to have like a function signature, like the name of a function, and then the parameters that get passed in with complete JSON structure. So you can be very detailed about how an LLM is to sort of call a function and get back results.

In this case, the equivalent under skills is just running a shell script and you can have a few different scripts to do different things and you can specify that they have inputs but it's a more simplistic approach. And maybe that's a good thing. Maybe that's the right level of granularity we've gotten too detailed with function calling.

But still, that's a downside worth being aware of. And then the other thing is about what we call discovery, which is basically how do you find the skills? It's sort of similar to to mcp, but it doesn't yet have the same level of traction as mcp So I would say if you thought that mcp was a bit of a wild west looking at mcp.so and looking at glamour Well skills are even worse It's really unclear where you go and and how you navigate them But there's good news here, which is that the typical way people actually install skills is what will come to next with plugins.

That is the most common way of doing it. And there are some evolving places to go. So we'll look at a couple of them ourselves.

And then the final point is quite similar to MCP servers, which is the way that you actually tell Cloud Code to use a skill is a little bit ad hoc, is a little bit ad hoc. It's a little bit hand wavy. Basically, it relies on you using terminology that kind of matches that top section of the skill where it tells it the most important information for it to decide whether to load the next part.

And so you sort of have to hit the bullseye in terms of asking it to do something that's going to match this top section. Now, you can also use that use approach to force Claude code to definitely use a skill. But that can be a bit brittle if you don't know the name of the skill or whatever.

So it's just a little, a little bit hand wavy. You have to get the knack for making sure that Claude code is going to be using the skill that you want to do the job you want it to do. And so in summary, I think a lot of us feel that skills seem like the more compelling approach for equipping Cloud Code with new abilities and expertise and information and that it might replace MCP altogether, at least for things like Cloud Code.

But it's still an evolving story, we will see where this leads. But in the meantime, I tend to favor skills over MCP, except in cases where MCP is the only thing available, like massive Polygon is a great example of where that's something very granular and needs to be done that way. Concept seven is something which has some skills, but they also need you to install the MCP server as well.

It needs both. Okay, so there are these three levels of what they call progressive disclosure. This kind of hierarchy of top level granularity, a bit more detail and a lot more detail.

The first top level detail, it's known as the metadata, and it's just the name and description of your skill. If you're building a skill for how to juggle, the name would be juggling, and the description would be this skill teaches you how you do blah, blah, blah, blah. And that's the metadata.

And claw code reads in all the metadata's for all of its skills. And then based on what you ask it to do, it decides does it need to read the rest? And so if you say, hey, claw code, can you juggle for me?

It'll be like, oh, I need to read this skill. And that next level is called the instructions. And this is tons of stuff or little stuff, whatever you think you need to put in there about your guidance, your workflows, maybe some code snippets.

If you want code to be able to write some code to do this and this, it might be instructions for how to juggle, which I imagine a code code would have a difficult time with. But those would all be in the instructions. And in these instructions, you could also reference different files with further resources, or even separate programs that could be run.

And those things are all considered like the third level of disclosure, resources and code to accompany the instructions. And they are only triggered if Cloud Code decides it needs to, otherwise it's not even, those files aren't even read. And that's the third level of disclosure.

So those are the three levels. And here's the thing, as with many things with LLABs, the way that this is actually implemented is like quite janky, quite simplistic. If they like to call it, it's implemented with a file system architecture, which sounds super fancy, which just basically means it's like, based on the directories, the folders and files, that kind of sets all of this up.

### Putting it together

So there's a directory that's called dot-clawed. And that actually appears in two places. There's a dot-clawed in your home directory, in your home directory for your computer.

And there's also a dot-clawed for each repo. We've already seen the dot-clawed that's been created in our repo. Every repo, every project that you use Cloud Code with gets a dot-clawed folder.

And you can put it in either repo. Every repo, every project that you use Cloud Code with gets a.Cloud folder. And you can put it in either place.

You put things in either place. And if you put it in your home directory, it applies to every project you've got. And if you put it in your project, one, it only applies to that repo.

So there's a.Cloud folder. And in that.Cloud folder, you put a folder called "skills". You create a folder called "skills".

It's just about the name. The name of the folder has to be exactly the word skills. All this doesn't work.

And inside skills, you put subfolders, subdirectories for each of the skills that you want to code code to know about. Each subdirectory is a different skill. And that includes a file called skill.md.

And that finally has to have a particular structure that tells Claude, uh, cool code how to apply that, that, that, that skill. In fact, it has both the metadata and the instructions. They both go in that file skill.md.

And then you can have other files and those other files will be referenced in skill.md and those other files are things that would just load in as that third level only if it needs to and more stuff and other file that gets loaded and only if it needs to and you can also have directories in there as well. You can have files and directories, subfolders, and in that directory you could have some scripts. You could have a Python script like this which it can then run should it need to.

So this structure, that whole folder structure, that has made a skill called migrate skill. And if you copy that folder and put it in somebody else's repo, they will have that skill when they run Cloud Code there. That it's not like a skill is about just taking that folder structure and putting it somewhere.

That's all it is, which is also, I mean, that kind of jankyness of it is also the beauty, the elegance of it too, because it means if you just check this into your repo, suddenly all of your teammates have the same skill as you. And it's one of the small thing to know, which is kind of clever. If if Cloud Code runs a script, it runs it just by making a sort of command line shell command to run a script.

The contents of that script and anything that it does, any processing it does, is kept out of the context. The only thing that comes back is the result of running it. And so it's very efficient from a context point of view.

And if that didn't completely connect with you, I think you sort of see it when you actually use it. It's very efficient in terms of not filling up the conversation, it's sort of offboards or that processing to the script itself. And I already made this point, but this whole structure that you see here, this whole folder hierarchy, if you have it in your project, in your repo, under.claud there, then it applies to this repo.

If you have it in your home directory, it applies to all of your repos. It's a general global skill that your cloud code is equipped with across the board. And that just gives you such an easy way to share skills.

And then the final point I'll make on skills and then we'll go and try them out, is that I mentioned it again briefly before, that's skill.md file. That contains the metadata and the instructions, metadata at the very top, and then the instructions in a particular format that is prescribed. And then all of the other files form the resources and code.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

Well, first up, you can have many of them. So it's like lots of claw.md's. So okay, it doesn't sound very innovative yet.

## Practical tips

- And then the final point is quite similar to MCP servers, which is the way that you actually tell Cloud Code to use a skill is a little bit ad hoc, is a little bit ad hoc. It's a little bit hand wavy. Basically, it relies on you using terminology that kind of matches that top section of the skill where it tells it the most important information for it to decide whether to load the next part.
- And so you sort of have to hit the bullseye in terms of asking it to do something that's going to match this top section. Now, you can also use that use approach to force Claude code to definitely use a skill. But that can be a bit brittle if you don't know the name of the skill or whatever.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

And you just have to refer to them in the instructions for it to work. And it's just a kind of convention that you do it this way. And when you follow this convention, it just all works. It's just built around the file system architecture, or just the way you name and structure the files and folders.
`;export{e as default};