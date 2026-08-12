# Subagents vs Agent Teams in Claude Code with Codex Review

> Week 3 · Day 1

## Overview

Okay, so we'll start by deleting review.md with its silly.env worry. Move that to trash.

Off it goes. Close down these documents.

And now we will go back to our agent here and see if we can't improve this. Okay, so I've just pasted in a new version of this called codecs reviewer.

## You will learn

- Understand the main ideas covered in **Subagents vs Agent Teams in Claude Code with Codex Review**
- Follow the practical walkthrough from Week 3, Day 1
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

I've also changed the name of the files to give it nice and clean. You carry out a comprehensive review of plan.md when requested using codex. You are using a different AI agent to carry a review of the document planning plan.md.

You must execute the following shell command to carry the review. Do not review yourself. I'm being super clear on this.

All right, with that, let's launch Claude. Okay, use your codex-reviewer subagent to carry out a review of planning/plan.md. That seems very clear.

Let's see what happens. Let's see what happens when we do this. It's thinking, it's celebrating, it's called the codex reviewer.

Is it going to do this? It's reading plan.md itself, but is it going to kick off the bash command? It's going to kick off is run codecs.

Let's see codecs exact. That seems good. Yes.

We'll let it run that. Okay. codecs is now running.

So we are running a sub agent in Cloud Code, and that is launching codecs, which is much the helping runners as a sub-agent. It's really cool that we're using a different LLM and a different LLM CLI as part of this process feels very sub-agenty. So that's going to happen now.

codecs is running in the background. We're going to let this complete and all of the two and fro between the two is not going to pollute the context. And so we're going to get back in a very efficient way, a code review that's just been written to review.md by codex.

And there we go. We've got like a response back. It's got a ton of bits of feedback here.

### Deep dive

Let's go and have a look at the review. It's got some strengths, that's kind of it. Some risks gaps.

It's concerned about the skill not being defined but it is defined, that's fine. It's because it was only looking at that file right there. It's concerned about polygon, we're fine with this.

And that doesn't seem like a concern to me. Okay, no explicit, that's fine. I think no authors intended.

Yes, pricing model assumptions. That seems fine. Okay, that's it.

It doesn't know that massive is the new name of polygon IO, obviously. Overall, this is a strong blueprint that should enable parallel execution. Little does it know that it's part of the first sign of that parallel execution.

Very nice. So it's kind of cool that we've had this independent, a different LLM go off and do this analysis, and we packaged all that into a sub-agent that ran within Cloud Code. It could have been, "Lord, maybe you just stuck "with using Cloud for the review, "and that's totally good, but that is how we are doing it.

Okay, and just to make this a little bit more interesting, I'm gonna change this now, not to review planning.md, but to review all changes since the last commit, making this a more general kind of tool. And I'm just gonna call it reviewer, and I'm going to use codecs, but you can just use Cloud code for this. You don't need to use codecs, but you can just use Cloud Code for this.

You don't need to use codecs. I kind of enjoy doing that to have this idea of a different LLM in the mix, but it's not required. Okay, so I've updated this to be changereviewer.md, change reviewer, and you can see it's going to carry out a comprehensive review of all the changes since the last commit.

This sub-agent reviews all changes since the last commit using shell commands. Now, I'm saying again that you should do it by using a shell command to call codex to do the work and not review itself but you can just tell it to do the code review itself that will work great. Cloud code will be good at it too but if you also have codex and this is a fun way to have different LLMs collaborate participate in the process.

So that's what I'm doing. I am now going to come out of Cloud Code and then I am going to launch Cloud again. And now I'm going to say use, oh I'm going to delete review.md, delete.

### Putting it together

And I can't remember what's changed since the last commit, but I'm sure it can use the change And use the change reviewer subagent to review changes since last commit. And we'll see what happens there, but it will hopefully go off, make that shell command call to codex. And we'll then have an update that will, there we go, you can see it's on waiting on the exact and that will then cause an up file to be written by codex or in your case perhaps by clawed that will have that code review and this is obviously starting to put in place the foundations of what can become our multi-agent orchestration and now it's completed it did for me indeed use codex maybe you've done it that way as well and I can see that it's got back the results of the just looking at the changes since the last commit, which is cool.

And yeah, this is a great example of using a subagent because the various toings and throwings about what actually was changed since the last commit and deciding how it's going to look into that and then ultimately coming up with the findings and then writing them, none of that was put into the main context window that was all handled by the sub-agent. And even more for us, that was actually handled by codecs off somewhere else, but it didn't need to be. It could've been handled by Claude Co.

Right there, it would still have been kept isolated from the main context, which is the whole point. And we can see it by doing a slash context and looking at what our context window looks like. We've got all of this stuff, but you can see this basically no, no real conversation has happened.

It's all very clean because that has been taken care of by our sub-agent. So on the list of things we were going to cover today, I had put agent teams, which is a new experimental feature in Cloud Code. And I'm going to cheat a bit in that I'm only covering it and I'm telling you that it's to come on day four.

we're going to, we're going to come back to this when we look at agent teams and a number of different constructs. But I did want to explain the difference between agent teams and sub-agents, because they are quite different. Sub-agents really are this way to delegate one particular task to another Cloud Code that's going to run with an isolated context.

And then the results will go back to the back to the main Cloud code that called it. And there is always this relationship that there is a main Cloud code that's just delegating off one task that goes to a subagent and back comes the result. It is actually possible for that subagent to have a longer term memory in those configuration settings.

You can ask it to have like project level memory. But with that caveat, aside from that, it really does feel very much like it's just taking the one task, carrying it out, and that it's purpose in this whole arrangement. Agent teams are a bit different.

Agent teams are about assembling a whole kind of group of Cloud Codes that all run collaboratively to try and solve a problem. So it is this thing that we're gonna be covering about swarms and orchestration when you have potentially many things all on the go at the same time. And one of the kind of big X factor moments with agent teams is that these different, these different, I would say subagents, but that might confuse you.

These different agents that make up the agent teams can communicate with each other. They don't just have to go through the main cloud code. They can also interact.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

I've also changed the name of the files to give it nice and clean. You carry out a comprehensive review of plan.md when requested using codex. You are using a different AI agent to carry a review of the document planning plan.md.

## Practical tips

- You must execute the following shell command to carry the review. Do not review yourself. I'm being super clear on this.
- Okay, and just to make this a little bit more interesting, I'm gonna change this now, not to review planning.md, but to review all changes since the last commit, making this a more general kind of tool. And I'm just gonna call it reviewer, and I'm going to use codecs, but you can just use Cloud code for this. You don't need to use codecs, but you can just use Cloud Code for this.
- You don't need to use codecs. I kind of enjoy doing that to have this idea of a different LLM in the mix, but it's not required. Okay, so I've updated this to be changereviewer.md, change reviewer, and you can see it's going to carry out a comprehensive review of all the changes since the last commit.
- And I can't remember what's changed since the last commit, but I'm sure it can use the change And use the change reviewer subagent to review changes since last commit. And we'll see what happens there, but it will hopefully go off, make that shell command call to codex. And we'll then have an update that will, there we go, you can see it's on waiting on the exact and that will then cause an up file to be written by codex or in your case perhaps by clawed that will have that code review and this is obviously starting to put in place the foundations of what can become our multi-agent orchestration and now it's completed it did for me indeed use codex maybe you've done it that way as well and I can see that it's got back the results of the just looking at the changes since the last commit, which is cool.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

You could have one agent that is the tester that is giving test feedback directly to your front end agent and your back end agent. So they all have kind of a long running presence in your team and they are able to interact with each other, challenge each other, try out different things, test different hypotheses, all of those kinds of ideas. And it is experimental in Cloud Code for me right now. Maybe it's more mature by the time you see it, we will be experimenting with it, but it's obviously a different mindset than booking with subagents, which is more concrete, more simple, take a task, delegate it, get back the answer.
