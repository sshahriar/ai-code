# Remote Execution & Cloud Sandboxes with Claude Code on the Web

> Week 3 · Day 2

## Overview

Okay, the juicy part what's coming in this blue box is what's known it's good it goes by lots of names It's confusing. It's sometimes called remote execution It's good with cloud code.

It's called cloud code on the web I think codex also calls it codex on the web, but the idea is this is about not running The cloud code instance on your computer, but it running somewhere else also typically it running somewhere else, also typically in a sandbox. So it allows you to do more work like to be able to kind of not delegate something to a different agent, but delegate it to a different execution engine, delegates the work to happen somewhere else.

And it can happen in multiple places. You can, you can have it going off and doing 10 different things remotely.

## You will learn

- Understand the main ideas covered in **Remote Execution & Cloud Sandboxes with Claude Code on the Web**
- Follow the practical walkthrough from Week 3, Day 2
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

It's also already sandboxed. When you do this, you do it typically through kind of dick GitHub. You check everything into GitHub, you send off a task.

It happens in a sandbox world, which is why it's kind of all related to sandboxing. And it allows you also, in this crazy way, to do work on the move. And when I say that, what I mean is, you could be like on your mobile phone, on your cell phone, you could be like punching an instruction to Claude.

And it's going off and doing it on the internet, in the cloud, in some way, and it's coming back and telling you something and you're continuing your conversation. And when you get back home, you're sort of picking up where you left off on your computer, which is crazy, but all of that is possible, and that's what I mean by juicy. It really is.

It's really cool. And it's worth mentioning that this is a hugely evolving space. There are multiple different kinds of offerings and flavors.

And so it's somewhat confusing. I will try and keep the course resources up to date. You may have different set of offerings than I have.

And that's one of the challenges of being in this space that's moving so fast. But I'll do my best to take you through the latest stuff that's there. It's also Claude code Code was the first to do this I think, but Codex now offers all of this too.

I think some of the others do, and if they don't, for me, they probably will for you. So you'll see that there's kind of analogous offerings from the different people, and you can pick the one that works for you. But the general principles is what I'll go through, and I'll give you, as before, the examples specifically for Claude Code, but you can probably apply this to whichever platform that you're most comfortable with.

Okay, so with this, I'm going to talk you through three different approaches, three different things we're going to do that some blend of those two techniques, and that is what we will then go and do. And it's a bit confusing, as I say, because there are so many different ways to slice this, but I just want you to be crystal clear on these three different ways. And I'm gonna stop by saying, what's one of the things that we're not gonna do?

I'm not gonna show you what would be the kind of original way this used to be done, which is using Docker, or for people familiar with VS code, it's what they call Dev containers, dot Dev containers, which is a way that you can use Docker, which itself gives you this box within a box. Remember that's how I explained it two weeks ago. And some of you probably know Docker very well.

It gives you an environment in which to do it. That's a kind of simplistic way of doing this. Everything we're gonna do is sort of saying, "Okay, yeah, that's a given that you could do that, but we can do something better that's more powerful in some way." So you've always got Docker and Dev containers if you want it, but this is all taking it a step further.

Okay. Approach one is something that maybe you'd call a native sandbox, just sandboxing. This is functionality that is built in to cloud code.

I don't think as of now that code X is yet doing this or Gemini CLI, but I might be wrong. And if I, and even if they're not now, they might well be by the time you're seeing this. But this is built into Cloud Code.

It's triggered by doing a command slash sandbox. And then you can set up Cloud Code so that it runs in a sandbox, meaning that things get auto approved within that sandbox. I'm pretty sure.

### Deep dive

Yeah. Yeah. Cursor has this functionality, right?

We saw it ourselves. They have like a built in auto-approved a bunch of things within their sandbox. So cursor through through the user interface has this Cloud code has this sandbox built-in and this is something that's it's like it's as if you're running your own docket But it's more efficient than that.

It's better than that It has it has lots of characteristics that make it very desirable as we will see and of course It's running on your machines And we're not doing anything remote at this point It's local. And the main way that it's better than running a Docker container is just that it's much more lightweight. It's implemented at the OS level.

So it's very easy and quick and lightweight and runs well. There is a catch though. There's a catch which you're not going to like.

The catch is that if you're a Mac person like me, this is super easy. If you're on a Windows PC, then to use this, at least as of now, you have to be set up to use something called WSL. If you already know about WSL and maybe you already use WSL, then that's all good.

You know exactly what you're doing. If you don't know it and it's about running a Linux machine on your PC and developing within that Linux machine, it's not worth you taking that on right now. You should focus on on the other two approaches.

If you're not familiar with WSL, but if you are, then you can use it with that. And if you're, if you have a Mac, then you're in great shape. And Linux is also great shape.

Okay. So that's the first approach. The second approach is the absolutely crazy one.

This is, it goes by lots of names. The product name is Claude code on the web. And codecs calls it codecs on the web.

So this on the web. And codecs cools it, codecs on the web. So this on the web is obviously like a thing.

The perhaps the technical way of describing it will be like a managed cloud sandbox. It's managed in that anthropic are taking care of it. They're running Cloud Code for you.

And it's a Cloud sandbox. It's on the Cloud and it's in a sandbox. So that's what this is.

It's basically you're connecting with Cloud Code from your CLI, from on your computer. But when you run something, it's not running on your computer. It's contacting anthropic.

### Putting it together

They're spinning up Cloud Code remotely on like their boxes and running it there in a sandbox. And that sounds like a whole lot of plumbing and configuration. And crazily, you can do it just by putting a little ampersand at the beginning of your Cloud Code instruction and then just typing out anything that you would have said to Cloud Code.

And it doesn't happen on your box, it happens out on the Cloud. And that sounds too good to be true, but we'll see it. You can also make a command and not not within Cloud Code, but just on your normal PowerShell of instead of Cloud, you type Claude dash dash remote and then your command and the same thing happens and off it goes.

It's crazy. So that's one thing. And then there's another thing you do which is also crazy, which is you can go to your GitHub repo and you could raise like a GitHub issue and tag it to Claude.

You put at Claude, You put at-claud, you like address it to-claud. And insanely, anthropic will spin up a-claud code in the cloud, connect to your GitHub repo, do the work, and then say when it's done. It's like, what?

That really happens, as we will see. And this needs you to install a GitHub app called the "Claud", GitHub app that we will do. It's tightly linked to GitHub.

So you do need to have all of your code checked in. Everything is organized by the Cloud code on the web, we'll clone the repo, pull down the code and operate on it that way. So everything has to be checked in.

And then there's one more feature that is like, "What?" The other feature is called teleport. And teleport allows you to sort of grab one of the cloud code things that's running out there and have that become your active session. It's like you're jumping into it.

It's it's it's it sounds very sci-fi and it takes a while to get familiar with this with this idea, but it's really cool and slash tasks as a way of seeing all the different tasks that are running. So one way to think about this, that I was saying yesterday that of course, a simple way to have multiple agents working on your work is just to press that plus button and run lots of Cloud CLIs. This is effectively doing that, except the Cloud CLIs are not running on your computer, they're running on on throw-bricks computers instead.

But otherwise it's quite similar and you can sort of attach to any of those conversations. So that's how it works. It sort of has to be seen to be believed, which is what we will do in a minute.

And then the final one is really interesting and this is a new emerging idea, which is, I'm calling it third party cloud sandbox. I don't know if that, to what extent that is like the most official way of calling it, but I think that's probably the most accurate. This is when you're not using anthropic, but you're using another company who has an offering that allows you to run something like a container in the cloud that is sandboxed, and usually in this case is designed for coding agents, so it's sort of optimized for that use case.

And one that's recently, for me, has really taken off, is called sprite.dev made by the people at Fly.io, that is a really great hosting platform. And this is particularly notable because it's very fast, very simple, very flexible. And it's designed for a few things, but one of them is very much like a clored code on the web in a managed sandbox.

So it's really, really convenient for that use case. And one of the other points to make about this is that this one is of course applicable to any coding agent.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

It's also already sandboxed. When you do this, you do it typically through kind of dick GitHub. You check everything into GitHub, you send off a task.

## Practical tips

- And that's one of the challenges of being in this space that's moving so fast. But I'll do my best to take you through the latest stuff that's there. It's also Claude code Code was the first to do this I think, but Codex now offers all of this too.
- I think some of the others do, and if they don't, for me, they probably will for you. So you'll see that there's kind of analogous offerings from the different people, and you can pick the one that works for you. But the general principles is what I'll go through, and I'll give you, as before, the examples specifically for Claude Code, but you can probably apply this to whichever platform that you're most comfortable with.
- I'm not gonna show you what would be the kind of original way this used to be done, which is using Docker, or for people familiar with VS code, it's what they call Dev containers, dot Dev containers, which is a way that you can use Docker, which itself gives you this box within a box. Remember that's how I explained it two weeks ago. And some of you probably know Docker very well.
- It gives you an environment in which to do it. That's a kind of simplistic way of doing this. Everything we're gonna do is sort of saying, "Okay, yeah, that's a given that you could do that, but we can do something better that's more powerful in some way." So you've always got Docker and Dev containers if you want it, but this is all taking it a step further.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

So this is something that you can use no matter what you've chosen as your coding agent of choice. Alright, so these are the three. It is a bit confusing, but I think it's going to become much more clear when we actually put them to the test, when we try them out. And of course, that's what we're going to do right now.
