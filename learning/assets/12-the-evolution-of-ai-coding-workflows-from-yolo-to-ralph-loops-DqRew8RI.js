var e=`# The Evolution of AI Coding Workflows From YOLO to Ralph Loops

> Week 1 · Day 2

## Overview

With all that talk of let it go, I don't have that frozen song playing in my head. I hope I haven't done that to you two now.

Anyways, so building on that, I want to show you what I would describe as the evolution of workflows. Workflow is a very common word in this field.

The workflow is about how do you go about organizing your activities around this mysterious, magical thing that is a coding agent. Workflow is really what Andrei Karpathy was getting at with that tweet.

## You will learn

- Understand the main ideas covered in **The Evolution of AI Coding Workflows From YOLO to Ralph Loops**
- Follow the practical walkthrough from Week 1, Day 2
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

The optimal workflow with coding agents has changed consistently with what I just described with the different school of thought between the two years. Let me take you through what I think of as the six different workflows which is some one analogous to the eight stages that we covered yesterday. So in the 2025 mindset there were perhaps three different levels of trusting and LLM.

At the lowest level of trust where we began is micromanagement and this is where you would use an agent but you, when I see you, I mean me, this is definitely was my mode for most of last year. I would very much write very specific instructions in agents.md, approve all of the changes, frequently stop it running, go back rewrite agents.md and then run it again and then check what it's doing with these frequent resets. And that was where I began and where many people began using some of these agent coders.

And then the next step was taking a bit of a step back, a bit more trust. Now, a lot of these programs, a lot of these coding agents have a planning mode. You can put them on plan mode.

And when they're on plan mode, they produce documentation like sort of to-do lists of what's going to happen. And you're working together on figuring out the plan for what's to be done. And then when plan mode is done, you say, okay, let's do this, and you put it onto execution mode.

And so that idea of planning first, and then executing, and typically you execute in phases. And for each phase, I would have it go off and build something, then I would do a code review and make sure it's not making a mountain out of a molehill as they often like to do and then after that I would have it test and I would come back and review the test results, do some testing myself and then mark it complete and move on to the next phase. So that is this kind of plan execute review test giving it a little bit more wiggle room, a little bit more rope, but generally still very much on top of things.

And then the next phase is about spec-driven development, SDD, where you are really specifying what needs to be done and then letting it go and do it and it's been specified there are even some some sort of spec languages when you can describe the spec in this very precise way. And really the other term for this is people talk about trust but verify. Trust the system, you come back to verify everything's doing what you wanted it to do.

But you're not doing the same kind of code review or detail testing until the end. So it's very much more of a step backwards and that the trust but verify mindset is something that has become increasingly common. So these are all sort of consistent with the 2025 approaches.

Okay, now onto the 2026 mindset starting with YOLO. YOLO, of course, has been around for a while. Most of 2025, it's not a new thing, but I would argue that it's only recently that people are actually using this beyond just for hobby projects.

People are now using this for real. That's why I'm putting it in the 2026 mindset category. YOLO, of course, is when you say, "You know what?

I don't need to approve anything." The coding agent can do whatever it wants. No permissions needed. So it's like, "Trust but verify.

Take it to a whole new level. You could just set this thing going and go off and have dinner and come back later and see what it did. It's never going to stop and ask, do you want to do this or not?

### Deep dive

That is the idea behind Yolo, a whole different level of trust. And next up are things called Ralph Loops. Ralph Loops were invented by the Australian developer, Luminary, Jeffrey Huntley, and it's named after the Australian developer, Luminary, Geoffrey Huntley, and it's named after the Simpsons character, Ralph Wigam.

And then so the full name is Ralph Wigam-loops. And he's recorded in Simpsons, this is like a sort of naive, optimistic character, and that is true to this design pattern. And here's the idea.

So you know that already an agent is something that calls LLM in a loop to achieve a goal and it calls it multiple times until it thinks it's used its tools enough and it gives some sort of an output. Well the idea of Ralph Loops is saying, well hang on a minute, can we put this entire process with this little loop to achieve an output? Wrap that in another bigger loop.

We will call this agent, we'll have it do its thing, use its tools, make some output. And then we'll do a test to say, has this done enough? Is this gone as far as it can go?

Is this as good as it can be? And if not, make some feedback, think about what the gaps are, add all of that to the objectives, and then just call the whole thing again, and have it go off again and do its loop and come back, and then get some feedback and just simply go off again and do its loop and come back and then get some feedback and just simply call it again and just keep going. Keep going up to some large number of times like 10 full times of doing this inner loop.

10 big loops of lots of little loops. That is a Ralph Wigam loop and that idea so I said with YOLO that you could leave something running over dinner with Ralph Loops, you could leave something running overnight and come back the next day and it's just done tons. That's the idea of Ralph Loops and that is another whole new level of trust.

And to make this real for you, this of course is what I did with the second example yesterday with the much more impressive first person shooter game. It was just the same, the same prompt as before, but I put it in one of these Ralph Loops, and I just left it going, and I just chugged away, and I came back a lot later, and that's what I had, and it was what we call one shot, and I didn't keep coming back and giving it more feedback and saying I'd like better graphics. I'd like this I'd like this I just left it doing its own thing and it was an L M that decided to come up with the feedback and to run it again And it kept going ten times and that was the output and so you know that that's what it does And when I say Ralph Loops here It's a bit of a point in time.

There's a lot of hype about these right now, and I really mean this as an overall category. It's Ralph Loops and things like that. Ways to have a much longer running task.

Not something, a YOLO is perhaps something that runs for an hour. A Ralph Loops is about bigger ways to run this kind of agentic coding in a way that's not measured in minutes but it's measured in multiple hours. It's perhaps something that runs overnight.

It's a long running process to run something completely trusted in a way that you will come back later and see what it's made with its own internal feedback mechanism. That's the bigger concept here. And that leads to the sixth approach, which is then about multi-agents.

This is about, it's sort of an extension of Ralph Loops. In Ralph Loops, there is another LLM that's doing some of the feedback potentially. But this is about where you have many different agents that are working with different roles, perhaps there are testing agents, feedback agents.

### Putting it together

There are agents organized into different categories and there are manager agents as we discussed yesterday. It's in some kind of hierarchy. And these are sometimes kind of swarm if you're spawning lots and lots of agents and you talk about orchestration if you are doing the kinds of setups that again that we discussed yesterday with the eighth stage.

But that kind of workflow, that is really the ultimate, that is what people at the forefront of this are doing now in 2026. So this is how I've seen the workflows evolve and of course this is pretty similar to Steve Yaggy's different stages of these coding agents that we talked about yesterday. And I would say that the question that I'm sure is on your mind is which approach is right and you know the classic answer to these things is that it's not like there's one approach that's right, it's that different approaches are right for different tasks.

And I would divide it into two categories. If you have things that are mission critical, where you're working on enterprise software on or on like a commercial SAS platform, or you're working with a large code base, or you're working with highly innovative code, like you're trying to generate something that is going to maybe use MCP servers or something like that. You're at the forefront of what you're trying to build.

Then to me, that lends itself to those first three approaches. You're somewhere on that curve. And so that would be one category.

But by contrast, if you were building an MVP, like a prototype, a pilot, or you're building something completely new for the first time from scratch with an empty directory, and you have some risk appetite, you're willing to take some risk, and you're trying to generate a lot of stuff that's fairly boilerplate, like lots of HTML or a React app or something like that that's going to involve a lot of fairly cookie-cutter stuff or crud back-end. Any of those kinds of examples, it's going to lend itself nicely to the more 2026 mindset to these kinds of approaches. That's how I would think about it.

It depends on the kind of project that you're working on, and it depends on your risk appetite and on whether it's it's sort of mission critical or not and I am you can probably imagine I'm going to say this but for me for most of what I work on I am more in that that top stretch I work on mission critical software typically I sometimes work on on small co-bases sometimes on large co-bases but it's often highly innovative stuff it's things like connecting with MCP servers, which typically these current LLMs are really bad at doing 'cause it's too new and they don't have enough training data with those examples in it. So they tend to not use idiomatic code, which is obviously a big problem. And so I tend to be in that top category with most of what I do, but sometimes I am in the lower category and so sometimes, but sometimes I am in the lower category and so sometimes, particularly if I'm building a pilot or something, I'm building like a website to do something that could easily be cranked out, then I will use that second category.

And in particular, when we built our game yesterday, we used, I guess, it was pretty much YOLO to start with. And then I did use Ralph Loops for the second version of it. So I will sometimes be in that second second strip, but most of my time is spent in the top strip.

We will of course cover all of this over the course of the next few weeks, but yeah, there's certainly going to be a leaning towards the more mission critical, large code base, real enterprise development patterns, how to use this in anger with a good nod towards the more 2026 mindset kinds of techniques. But the one thing I want to stress beyond all that else is, and this is particular, I know that there are people here from all of the spectrum, from a senior engineer to a junior engineer or someone just starting out. And this is particularly for people who are more towards the beginning of their technology career, is that your job in working in this field is to deliver code that's proven to work and it's no good to blame the LLM.

By all means you should use LLM's to help you for sure.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

The optimal workflow with coding agents has changed consistently with what I just described with the different school of thought between the two years. Let me take you through what I think of as the six different workflows which is some one analogous to the eight stages that we covered yesterday. So in the 2025 mindset there were perhaps three different levels of trusting and LLM.

## Practical tips

- And so that idea of planning first, and then executing, and typically you execute in phases. And for each phase, I would have it go off and build something, then I would do a code review and make sure it's not making a mountain out of a molehill as they often like to do and then after that I would have it test and I would come back and review the test results, do some testing myself and then mark it complete and move on to the next phase. So that is this kind of plan execute review test giving it a little bit more wiggle room, a little bit more rope, but generally still very much on top of things.
- I don't need to approve anything." The coding agent can do whatever it wants. No permissions needed. So it's like, "Trust but verify.
- Take it to a whole new level. You could just set this thing going and go off and have dinner and come back later and see what it did. It's never going to stop and ask, do you want to do this or not?
- It depends on the kind of project that you're working on, and it depends on your risk appetite and on whether it's it's sort of mission critical or not and I am you can probably imagine I'm going to say this but for me for most of what I work on I am more in that that top stretch I work on mission critical software typically I sometimes work on on small co-bases sometimes on large co-bases but it's often highly innovative stuff it's things like connecting with MCP servers, which typically these current LLMs are really bad at doing 'cause it's too new and they don't have enough training data with those examples in it. So they tend to not use idiomatic code, which is obviously a big problem. And so I tend to be in that top category with most of what I do, but sometimes I am in the lower category and so sometimes, but sometimes I am in the lower category and so sometimes, particularly if I'm building a pilot or something, I'm building like a website to do something that could easily be cranked out, then I will use that second category.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

It allows us to do a lot more, but it's still ultimately of course your responsibility to deliver quality code that works and saying well the LLM wrote that. That is no excuse. The LLM wrote it, but it's your job to check its work, to validate it and to pick the right stage, the right approach which meets the task at hand and which is appropriate for what job that you are doing. So ultimately it is super important that we all take accountability for the work that we deliver, whether or not we use LLMs to help us get there.
`;export{e as default};