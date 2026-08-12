# AI Assistant Kanban App Complete Codex, OpenRouter & Week 1 Wrap

> Week 1 · Day 5

## Overview

Okay, so here we are in a new chat. I'm going to start by saying please read agents.md then read the plan and let me know any questions before we start part eight.

Okay, it's thinking about that. Okay.

Right, so first of all, for the two plus two integration test, do you want it fully mocked? Or should it at the backend endpoint?

## You will learn

- Understand the main ideas covered in **AI Assistant Kanban App Complete Codex, OpenRouter & Week 1 Wrap**
- Follow the practical walkthrough from Week 1, Day 5
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

Well, mocking, actually, actually, I want it to go all the way to open router. No mocking, let's check. We can get an answer from the model.

That's important. I saw that before when we look at the plan. I remember thinking, I don't like the fact that it's mocking it there.

So I'm super happy that it asked, should it be under API AI or API chat? API chat sounds great. Do you want the open routes of base URL configurable or hard coded?

Hard coded is good for now. Please note these answers in plan.md and proceed with part 8. Exciting!

And there's something comforting about knowing that we've got a completely fresh chat, so the context window is empty, but it's not completely empty because it's got the agents that empty and the plan that it's loading in there. And that means we're making really efficient use of the space. It's not cluttered with all of that stuff about worrying about drag and drop, which would have really filled up lots and lots of room and sure it would have been compressed and it would have been summarized but it would still have been hogging space.

Now it feels like it's nice and efficient. We've got good good use of space. We're positioning our agent for success, Kodak's for success.

And I will see you in a minute when it's done with part eight. Okay, and I just experienced the good and the bad of restarting the conversation. You may have had this experience too if you're following along with me exactly.

It seemed faster and more accurate somehow. It feels almost like it sort of decluttered its brain to reset the conversation, but then it also got stuck trying to run tests because it forgot the right way to start the server and it took a while took five minutes of thrashing around to figure that out. So I've asked it to update its own plan.md to make sure that's clear for the future.

And I've asked it to confirm the testers will run. OpenRooter is working. Part eight is done.

So we'll keep our edits. We'll do a git status. And we will do time to go on to part 9.

Please proceed with part 9. And off it goes. Let's come back in a second when that's done.

Okay, and more progress. Apparently bar 9 is done too. And it had done some mocked tests and I had to prompt it to ask it to actually test against open rutor that it claims it is now done.

And we won't know for sure until we've added part 10, which is the user interface for us to do that. And that's what's coming up next. It's a big moment for us.

So I'm just going to again, do get, we're doing, we're being very careful about checkpointing at each point to get status. I'm just going to press the keep button here. I'm going to do get add dot.

I'm going to do get, get add dot, I'm going to do get commit minus m plan a part nine is complete and then and then it's time for us to go ahead with with the part 10. Okay, please proceed with part 10. Very exciting.

I will see you in a second. Okay. All right, so we should be done Let's have a look.

Do you think it's gonna work? Do you think it's gonna work? Let's find out.

Let us go and run scripts Slash start - Mac for me and Something is starting. There's no errors that I can see so far. Let's go over here Let me go to localhost 8, Here we have our usual login screen.

### Deep dive

We'll come in like this. We're going to get the usual password error. Okay.

We see a cambam board, but something is different. There's an AI assistant chat on the right. Let's just say hi there.

Enter. See what happens. Hello.

How can I help you with your board today? There's an AI at the other end of this. We have an AI assistant app.

People pay big money for this stuff. All right, let's see what we're going to ask it. Oh, please, please summarize my project for me.

Okay, so we're asking you to do that. Well, it's pretty fast, isn't it? Your project spans five columns, backlog, in progress, review and done.

It seems to have that about right, doesn't it? Okay, I like it so far. All right, now I'm going to say, please move this thing here, the gather customer signals card from backlog to, let's go all the way over to done.

We're gonna move this guy here all the way over to done. We're going to move this guy here all the way over to done. Let's see what happens.

Bam, do you see that? It moved, it moved. Are the magic of AI.

There we have it. We have a cam and board. This data is persisted to disk.

It's got a database behind it. It's running in a Docker container with a front end and a backend. And it's got a database behind it.

It's running in a Docker container with a front end and a back end. And it's got an AI assistant we can chat with to rearrange and organize our project. It is an app.

And if you don't believe me, that of course you shouldn't, we should bring up a new tab altogether, go to a local host, come in, not as add as user and password, erd, Sign in. Here we go. And we're happy to see that Gather Customer Signals is still over here in the Dun column, proving that it has been persisted to disk.

Beautiful. Now, the thing is, this is not the end. This is the beginning.

You will have something different to this. Of course, it will look different. It will probably won't look different because you started with the same cam band studios B.

But now this is a canvas on which you can build and you can keep working. It looks like we should try and do some work to resize these columns. We might want the chat to show when it's thinking, maybe stream back results.

We might want to, we can add in different users. You can log in as different users. That it's all ready for that.

You could have different camban boards adding on boards. You can see how just doing the same thing, cranking the handle and the way we've been doing. We've done a full pass with the minimal starting point.

### Putting it together

And now you can add and add and add. And I hope you see, I hope you get this sense, that this is the beginning of something that could be a complete full app. It has users, it has functionality, it has a database.

This is something that could easily be turning into a product that people would pay for. It's a real useful commercial app we have here, some project management software with a cam and board with an AI assistant chat to work on your project with you. And this has been all to set you in motion for vibe coding, for building these kinds of apps.

What we're going to be learning about in the upcoming weeks is taking this to the next level. If we look at the main results in here, the main piece of Python code is one module called main.py and I have to be honest with you, it's a bit of a mess and that's why it's good to take things step at a time because if I were going to keep going now I would stop and tell it this needs to be refactored. This definitely is something of a disaster here.

It's an enormous great look at look at here. You can see the summary. It's really shoved everything in this one Python module which has many different concerns.

It seems to me, I don't know why it's gone down this path, but it seems like it's a major gaff that needs to be fixed. What we would do typically is we would have another agent that's responsible for doing a code review, and it would definitely point this out. But otherwise, if I were taking this forward, the first thing I would do is get this restructured so that it's organized in a better way, along with fixing up some of these interface, adding in users, and then perhaps having a remote database like in super base.

So all of those things can be done. And these are all things that you should do. That is the assignment for the end of week one.

Take this now, take it further, add on, take it in the direction that you want. You don't need to add in users if you don't need to. You could ask it to add instructions for deploying this, deploy it to Versailles.

Once you've got something in a container, it's so easy to deploy anywhere to AWS App Runner, to GCP Cloud Run, to wherever you want. It can give you instructions, step-by-step instructions, and it can even do the deployment itself if you want. So all of these things, you should take it in some direction, and then message me and tell me what you've done.

I can't wait to hear how you've taken this and made it into a proper product that could even perhaps be monetized. And as you roll up your sleeves to do this assignment, let me leave you with an inspiring final tweet from Andre. This is actually, this was at the bottom of what I showed you before.

I held this back. He ends by saying, where does this leave us? LLM agent capabilities like Claude and Codex especially.

And he's referring to Codex the model, the one that we use today, not Codex the platform. So we were doing that today. They have crossed some kind of threshold of coherence around December of last year.

We're causing a phase shift in software engineering. The intelligence part suddenly feels quite a bit ahead of all the rest of it. And so then he lists out the other stuff that we're going to be coming on to.

So this is going to be a high energy year as the industry figures out how to bring together this new capability and factor it into all the sorts of integrations and workflows and processes. So very exciting times indeed, and I hope you are super inspired by seeing what Codex was able to do in GitHub Copilot. And now you are taking that yourself and taking it forwards.

And with that, that is a wrap on week one. That completes day five. You have now vied coded for fun in that you built a first-person shooter.

You built a personal website with a digital twin, and then you've just built the beginnings and MVP of what could be a real commercial product. Project management software with an AI assistant, a camben board, drag and drop. It's the whole works and you're taking it even further right now.

So that is fantastic. Congratulations on making it to the end of week one.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

Well, mocking, actually, actually, I want it to go all the way to open router. No mocking, let's check. We can get an answer from the model.

## Practical tips

- That's important. I saw that before when we look at the plan. I remember thinking, I don't like the fact that it's mocking it there.
- It seemed faster and more accurate somehow. It feels almost like it sort of decluttered its brain to reset the conversation, but then it also got stuck trying to run tests because it forgot the right way to start the server and it took a while took five minutes of thrashing around to figure that out. So I've asked it to update its own plan.md to make sure that's clear for the future.
- And if you don't believe me, that of course you shouldn't, we should bring up a new tab altogether, go to a local host, come in, not as add as user and password, erd, Sign in. Here we go. And we're happy to see that Gather Customer Signals is still over here in the Dun column, proving that it has been persisted to disk.
- It seems to me, I don't know why it's gone down this path, but it seems like it's a major gaff that needs to be fixed. What we would do typically is we would have another agent that's responsible for doing a code review, and it would definitely point this out. But otherwise, if I were taking this forward, the first thing I would do is get this restructured so that it's organized in a better way, along with fixing up some of these interface, adding in users, and then perhaps having a remote database like in super base.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

Week two is huge. We make the transition from vibe coding to vibe engineering. We're going to be using Claude code in anger and I love Claude code and I can't wait to show it to you. We're going to be coding in a CLI as it gets super professional and for people that already used it before I've got a treat in store for you as we're going to really roll up sleeves and get into it and I can't wait and with that that concludes week one you are 33% of the way through this course you are on the way to being an agentic engineer I will see you for week two.
