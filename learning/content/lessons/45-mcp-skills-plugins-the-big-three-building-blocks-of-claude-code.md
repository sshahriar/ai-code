# MCP, Skills & Plugins The Big Three Building Blocks of Claude Code

> Week 2 · Day 3

## Overview

I've used the expression 'inflection point' to describe what happened in November of 25 as as anthropics clawed, opus 4.5 came out and suddenly the capabilities of models seemed to cross a line and become just incredibly powerful. Well, 'inflection point' is how we describe today.

Week two, day three, we are crossing our line. Your expertise is about to go to a different level.

And we're also passing the halfway point. Welcome to another Purple Day, another day of expertise.

## You will learn

- Understand the main ideas covered in **MCP, Skills & Plugins The Big Three Building Blocks of Claude Code**
- Follow the practical walkthrough from Week 2, Day 3
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

Welcome to week two, day three on MCP, skills and plugins. Today is just a giant of a day. We have a lot of material to cover.

Some of it might be a bit much of a overwhelming, but never fear. This is gonna be material that we're going to come back to again and again and again until you're fed up of it. So enjoy it this first time round because you're going to hear it a lot.

We're going to cover these very key building blocks of working in Claude Code. And this really ties back to the Andrei Carpathi tweet that we began the whole course on about the confusing array of different techniques you can use to get more out of Claude code. So here are the big three that we're going to be covering today.

And then there are a few more but they aren't as important as these big three. MCP, MCP is all the rage. Everyone loves to talk about MCP.

It is, of course, a way to connect Claude code to somebody else's tools, tools which someone else has written. Then there are skills. Skills came after MCP.

They are also a way to add expertise and capabilities. They have a lot in common with MCP in some ways. It's like a competing alternative approach to do mostly the same thing and we will compare them.

And then thirdly, there are plugins and plugins is just a higher level idea. Plugins are packages, bundles of mcp skills and other things, packaged together conveniently in a much easier way to install. But these three are confusing because all three of them can be installed and uninstalled and activated separately.

So you need to understand each in its own right, you need to see how the journey has developed such that we have all three available to us now. And then I will give you complete clarity on when you use which. And in order to give you this complete clarity, I first have to be clear myself on what is the big innovation behind Claude Code, that all these different things are sort of dancing around.

The big innovation, it comes down to those four tricks that I told you about last week sometime, at the beginning of last week. Four tricks that get us from just running an LLM that predicts tokens, a basically a predictive text on steroids to something that feels like a Gentic AI like Claude Code. And out of these four tricks, the one that really stands out is the use of tools.

This is this idea that as part of generating tokens, you can generate tokens which describe an action that you want the LLM to take. And that takes us from the world of just generating content to a world of actually taking action. And so I want to really hammer home that it is that idea tools, which is the basis of all of these other bits, bells and whistles we're going to add in.

Tools are what allows an LLM to take action, not just generate content. By virtue of the content it generates, it generates content and we interpret that to say, "All right, you're making a decision. "You're taking an action." And for example, Cloud Code has baked into it some tools, some of them that you've seen very visually already, there's a tool to manage a to-do list.

### Deep dive

Tools that let it add to the to-do list and mark things as complete. And it uses those tools a lot, and that's where you see in the output from Cloud Code. Apparently, it's checking things off.

It's because it's using that tool, and that guides its thinking, and it guides the process. And the big innovation with Cloud Code was when anthropic just added a bunch of tools into Cloud Code. There's the to-do list.

There's something that lets it manage files and edit files. There's something that lets it search the internet. And all of these tools give it the abilities that you see.

And all the way back in late 2024, anthropic realized that this ability to stitch in tools into something like Cloud Code, that was something that was gonna be really game-changing if they could figure out how to do that in a seamless way. There were some frameworks around at the time. There are things like Langchain, if you know that, which have libraries of tools that coders would write, and they'd conform to some sort of a framework.

And as long as you've done it that way, then if you're a user of that framework, you could use other people's tools. And anthropic realized, if you could do something like that in a really general way such that you could just bolt tools into Claude code and Claude code would just be able to use somebody else's tools. That could be something that would that would unlock huge amounts of capabilities within Claude code allowing anyone to write more tools and so in late 2024 about the same time that Claude code was being worked on they 2024, about the same time that Cloud Code was being worked on, they announced MCP, the Model Context Protocol.

And as they explained at the time, they described it as the USB-C port for AI applications. And they also described it as an open source standard for connecting AI applications to external systems. Originally, it actually supported tools and also prompt templates and also what they call resources, just sets of information, making it easier to hook up any of those things into an AI application.

It's really the tools part that's taken off in a massive way, but the other things are supported as well. But the idea is it's not about actually the tools themselves, it's about connecting someone else's tools to your AI application. It's about connecting someone else's tools to your AI application.

It's the connectivity and it's not necessarily the implementation. It's not the technology to connect them. It's just the standard.

It's a protocol. It's an agreed way that you can write something that means that the tools that you've written can be shared and used by somebody else's application like a Cloud Code. So that is the key point.

It's a way to connect your application like Cloud Code to tools that somebody else has written, a way to share tools so that you can equip your Cloud Code with tons and tons of tools. And also if you use Cloud.ai, or chat GPT, any of these kinds of AI applications that are ready for MCP, you can just hook in tools that somebody else has written. And if that still sounds a bit abstract, we'll do it for lots of them.

And the big thing to understand is that the major innovation is tools. That's the thing to be really excited about. MCP is great, but it's really, it's just about it being in a greed standard that tells us how we can take someone else's tools and put them in our cloud code.

### Putting it together

And so to really, really press the points to say what is so great about MCP and then what's great is it's such an easy way to stitch in somebody else's tools. It's also, if you've written a tool and it's a great tool and you're thinking, everyone should be able to use my tool. It's the best, then it gives you a way to make that available to other people and say, hey, you can use my tool in your Cloud Code or in your chat GPT, it can have this extra ability.

I've written it, You can use it. It's plug and play. And it just gives it an easy way just to connect an LLM to a tool.

If you've got an LLM and you want to be able to use a tool from a library, you can easily plug it in. The game changer, the thing that has made this so different, is the fact that it's been so widely adopted. That's the reason it's a big deal.

There are other ways that you can connect tools to applications like Langchain. There are other libraries of tools. But the way that it's been adopted, the ecosystem that is built around MCP has made it such a big deal.

So when people get very excited, there's so much hype about MCP. People wanna talk about it all the time. Where are you using MCP in your business?

Just be sure to keep them grounded with clarity on why you should be excited about it and why you shouldn't. And so to be concrete, why you shouldn't necessarily be so excited about it. First of all, MCP is about the interface between them.

It's not the tools themselves. If people have great tools, you should be excited about the great tools that they've written, like tools that can browse the internet or that can look for the current market data for equity prices. Those kinds of tools are great tools.

MCP is just the tissue to connect them. It's a standard, I'm repeating myself, but you get it, it's a standard, it's a protocol. It's not necessarily the implementation.

And also something that is a very specific problem with MCP is that it's not a very efficient way to do things. If you use too many mcp servers, and it can be very tempting to stitch in lots of mcp servers because they've all got juicy functionality, and you might think, oh yeah, I could do some of that, I could use some of that. Yes, let me add that all in.

Before you know it, you can start to fill up your context window, and very recent innovations at 2026 has improved the situation. There's now, call code is now quite smart about not overly loading in the context window, but there's still other reasons why if you're actively using lots of mcp servers, you could quickly fill up the context window with stuff very easily. So it's not particularly context efficient, even with recent improvements.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

Welcome to week two, day three on MCP, skills and plugins. Today is just a giant of a day. We have a lot of material to cover.

## Practical tips

- Some of it might be a bit much of a overwhelming, but never fear. This is gonna be material that we're going to come back to again and again and again until you're fed up of it. So enjoy it this first time round because you're going to hear it a lot.
- And then there are a few more but they aren't as important as these big three. MCP, MCP is all the rage. Everyone loves to talk about MCP.
- And so to really, really press the points to say what is so great about MCP and then what's great is it's such an easy way to stitch in somebody else's tools. It's also, if you've written a tool and it's a great tool and you're thinking, everyone should be able to use my tool. It's the best, then it gives you a way to make that available to other people and say, hey, you can use my tool in your Cloud Code or in your chat GPT, it can have this extra ability.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

And so you can start to see degrading performance, and you can start to see yourself filling up the window and going into compacting far too soon if you overuse mcp. And on that note, we're going to next cover skills and skills in some ways addresses some of those negatives. Skills is something that is perhaps a step in a better direction although it doesn't do everything mcp does so it's like got some pros and some cons but a lot of people are thinking that really ultimately skills might be the thing that replaces MCP everywhere. And you'll see more about that later.
