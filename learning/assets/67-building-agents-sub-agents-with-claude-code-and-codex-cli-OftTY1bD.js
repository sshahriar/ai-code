var e=`# Building Agents & Sub-Agents with Claude Code and Codex CLI

> Week 3 · Day 1

## Overview

And now we get to talk about agents and subagents. And let's start with agents or multi-agents.

And as I said before, I've got some boring news for you that is largely, when people first talk about multi-agents, the simple thing they might mean, is that it's perfectly simple, of course, to start multiple clords. So we've got Claude running right here, and I can press this plus button, and now we're in a new terminal, and I can just type "clawed" and launch a second "clawed" and I can press the plus button and I can type "clawed" and launch a third "clawed" and now we have three different "clawed" prompts and in one of them I could say "build the front end", one of them I could say "build the back end" and one of them I could say "build the tests" and as long as I've done a good enough job of identifying the boundaries and how they'll work together, they would probably just all work in parallel.

It's a great example of the dangers of chaos because this plan document is not yet well enough fleshed out. You might wanna try this just as a challenge.

## You will learn

- Understand the main ideas covered in **Building Agents & Sub-Agents with Claude Code and Codex CLI**
- Follow the practical walkthrough from Week 3, Day 1
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

If you wrote these, if you kicked off these three as three separate agents running, I think that probably a fiasco would emerge. I just think there's not enough substance on how they would interact and you'd end up with bits that just wouldn't fit together. And the agents wouldn't even know that they're each working on it.

So there will be tremendous confusion. So there's not enough kind of fabric in place for us to just kick off three different agents. But it gives you a sense of what it means and we can certainly do some small experiments in this front.

But I'm actually gonna take this down a different direction, which is totally optional. You can do everything I'm about to do using Cloud Code. But I thought I'd shake it up a bit and show you an example of using a different coding agent as one of our other agents.

In fact, I thought I would use codecs. And we've experienced codecs, of course, as an IDE plugin. You can still see the codecs icon up there where it started out.

We are going to use codecs as a CLI. The equivalent that OpenAI has to Cloud Code, which is how codecs began. So I'm going to quickly install it now and show you how we can use it as an alternative or really to collaborate with Cloud Code.

So this is the codecs CLI, like, I'm so homepage, you get it if you just Google codec CLI, but I'll put it in the course resources. And there's installation instructions and there is, you can do it with MPM or if you're on a Mac, you can do it with Homebrew. I'm just gonna use MPM because I'm used to it.

And then you run it with just running the command codecs. That's it. Okay, let me come back here.

I'm gonna click here and run that command. You might have to press the plus button if you need a new terminal outside called code, because I'm not sure that Claude code will understand that command. But here we go.

I'm installing codecs right now. Have that installed and you can also use any of the other installation techniques. Looks like mine was already installed and now I'm going to run it with the command codex codex here we go.

I think first time it might make me log in. I'm already so the first time it might it might take you through that usual overflow of signing into open AI but mine already knows I'm logged in. I'm going to say yes codex can work if this folder and there we go we are in to codex very nice.

Try the new codex app apparently. That's something to try but we're not going to try that. I'm going to open a new screen like this and now check this out.

I'm going to write just a normal shell command. I'm going to call a program that's called codecs with the command exec and that is a way of just saying I want you to run this prompt do it and that prompt is going to be, please review the file, planning/plan.md and write your feedback to planning/review.md. That is going to be my codecs exec and I press enter and off it goes.

This is now launching codecs as like its own thing, running this review and it's going to then write the file to review.md. And this is clearly a sense that you're getting right now of having a different agent. Now it doesn't need to be codecs, it could also be clored that you could just run, of course, you can have multiple windows, you can have clored running twice.

But it's kind of course, you can have multiple windows, you can have Claude running twice. But it's kind of cool that we can have a different agent all together and since I happen to have plans for both, I've got that and it's just written review.md. It was very quick.

Let's open this up and review feedback planning plan.md and it's got all sorts of stuff in here. It was very quick. There you go.

What's that last one I just saw? Massive API refers to Polygon IO, but the name is a placeholder. That seems like a bit of a poor piece of feedback there.

This is codecs 5.3, we expect more. So interesting stuff, but this really gives you a sense that we can have a powerful model like codecs be running based on a shell command as a separate agent. And this opens the door to lots of new possibilities for us as we will explore.

### Deep dive

Okay, it's time for subagents. A big topic starts now. We've already experienced subagents a bunch of times.

First of all, just using Cloud Code, it comes with a lot of subagents built in. There's like an explore one and a plan one. It's something which can take on a task, run with the task in a separate context so that this doesn't pollute the context of the main Cloud Code, do the task, return the response, and that goes back into the main Cloud Code.

And there's one for exploring file systems, as it builds the code base, planning one, a bunch of others, you see them kick off from time to time. They sometimes print with a different color in its trace and you see them doing their thing, and then they return back their information. Very common.

Sometimes they use cheaper models like Haiku so that they're faster and cost less to carry out their tasks. So it's great for off-boarding context, faster, cheaper, and so on. But context is the big one.

And also for paralyzing things 'cause they can run in parallel. We've also experienced sub-agents when we use some of the plugins because plugins can come with sub-agent definitions built in and we saw that with with rough loops I think and with a couple of others. So we've experienced them as we've gone along this journey, but now we're going to build our own.

And we'll start by going back to Claude code. I'm going to show you can type /agents to have a look at the different agent setups. You've got the, you can see there, that first of all there is a create new agent option that will guide you through the process of setting up an agent, but again, it just turns out to be files, and we can just create the files ourselves, 'cause we're pros, but you can also go through the menu.

Then you'll see that there is an agent that came with a plugin, the code Simplifier agent, because we selected that plugin at some point. And then there's the built-in agents. You can see here a general purpose one.

I think I mentioned the Explore one that uses haiku. And yeah, you could see some of these built-in agents, and you probably already experienced them running. But we're now going to create our own.

You could do that by using this menu option, create new agent. We're not going to do that. We're going to create our own by setting up the file.

And there are multiple places you can go to to create your agents. You can do that in the.claud project folder, as we will, as we've been using for commands and skills. You can do it in your home directory.claud to have a subagent that you can use in any of your projects, but that you won't manage in project code base.

I don't think we'll do that, but you can. You can actually pass them in when you start up Claude. manage and project code base.

I don't think we'll do that, but you can. You can actually pass them in when you start up Claude. You can run Claude and then create an agent with some flags you pass in, which is a pretty specialized thing that we're not gonna do that.

And you can also use them as part of plugins if you create your own plugin. And we probably will do that. But for now, let's just go into Claude, have a new folder and call it agents.

So we now have command skills and agents, which is where we begin. All right, so I'm gonna create a new file inside agents. And I'm gonna call it, let's just call it a reviewer.

Reviewer.md, this is going to be our reviewer agent. And now we put some stuff in here. Okay, so here we go.

I'm gonna put in, I'm going to paste them on, I just wrote. So we're going to call this thing reviewer, the description, carry out a comprehensive review when requested. And now you can specify tools and a model, the tools that it has access to and the model that should be used.

But you don't need to, and if you don't, then it gets access to whatever the thing that kicks it off has it like inherits. And that's what we'll do, we're just going to keep this super simple. You review the file, plan, plan.md, and you write your feedback to planningreview.md.

### Putting it together

This could equally be a command or a skill. We're calling it an agent, and we'll compare the differences, and let me delete this file here so that's no longer there. It's got the answer.

Okay, that is our agent. Okay, so I'm now going to close out of Claude code, bring it back in again. I will go slash agents to look at the agents and you'll see that the reviewer agent is there.

We have a reviewer agent call. All right. So you don't call an agent with a slash command.

That's not how it works. It's not like a sort of like that, didn't it? It's not like this reviewer in there.

I'm going to say use the reviewer agent to carry out a code, a review. Let's just do that. It's spelled review wrong, but hopefully that won't cause any problems.

It should now be launching our new review agent and be doing that. There we go, carry out a comprehensive review. It's, you can see it's the reviewer agent right there.

That's cool. It's doing its thing. We will let it do its thing.

I will see you back here in a second. And that completed successfully, and it all happened. It was written to review.md, and as you were hopefully watching yourself, it was the reviewer agent that carried it out.

Actually, I think that what I should have said here is use the reviewer sub agent. I don't know how much that matters, but that is the suggested way of doing it. Use the word sub-agents, the tele-chloride, that's what you want it to do.

But generally speaking, one of the big distinctions with what we were doing before, there's a couple, one of them is that you can't directly call it, you have to let it decide itself whether or not it should use the sub-agent. And secondly, that work that happened to go through analyze thing, read the file, that all happened in a subagent outside the context of the main agent, allowing us to efficiently divvy up the task. It allowed us to frame a prompt for a different subagent and also keep that context isolated.

Those are some of the big advantages and we'll go through more of them later. And that whole file has been written here to review.md that we can open up. And this is a project review that's got through-- oh, there's a critical security issue.

This often seems to happen with the sub-agents. I think we experienced this ourselves before. This fact that the sub-agents tend to think that there's an issue that.env isn't in.get_ignore, but the key is visible in the repository.

I suppose that is a security issue in some ways, but only with people who have direct repository access, which is only me. Anyways, this happened. We've got our review.

The sub-agent worked. That is very interesting. What else can we do?

You know exactly what I want to do.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

If you wrote these, if you kicked off these three as three separate agents running, I think that probably a fiasco would emerge. I just think there's not enough substance on how they would interact and you'd end up with bits that just wouldn't fit together. And the agents wouldn't even know that they're each working on it.

## Practical tips

- I don't think we'll do that, but you can. You can actually pass them in when you start up Claude. manage and project code base.
- I don't think we'll do that, but you can. You can actually pass them in when you start up Claude. You can run Claude and then create an agent with some flags you pass in, which is a pretty specialized thing that we're not gonna do that.
- But you don't need to, and if you don't, then it gets access to whatever the thing that kicks it off has it like inherits. And that's what we'll do, we're just going to keep this super simple. You review the file, plan, plan.md, and you write your feedback to planningreview.md.
- We have a reviewer agent call. All right. So you don't call an agent with a slash command.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

I want to have codecs be the thing that does the review. I want to have a different AI the thing that does the review. I want to have a different AI. Let's give that a shot in the next video.
`;export{e as default};