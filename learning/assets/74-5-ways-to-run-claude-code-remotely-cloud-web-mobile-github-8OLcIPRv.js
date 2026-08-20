var e=`# 5 Ways to Run Claude Code Remotely Cloud, Web, Mobile & GitHub

> Week 3 · Day 2

## Overview

So the result of all of these shenanigans is that we are now able to use Claude Code either here, locally, on my computer as always, or remotely have Claude Code work for us in the cloud. And there are five different ways that you can do it, and they all have, well, not all of them, some of them have some differences.

And I'm going to quickly go through all five of them and experiment with some of them. And I say some of them because I'm probably exploring some production outages at the moment, which slightly limits what I can do, but it doesn't matter because the ones that I can do right now are still some of the coolest.

So the simplest thing you can do is that if you have any command you've got, like, hey, what's two plus two, which no doubt, Club Code will not have much of a problem with. It's thinking about that four.

## You will learn

- Understand the main ideas covered in **5 Ways to Run Claude Code Remotely Cloud, Web, Mobile & GitHub**
- Follow the practical walkthrough from Week 3, Day 2
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

You can put an ampersand before it and then that same thing will not run on your computer, but it will spawn, anthropic in the cloud and run it and get you back the answer. But that's the thing that has a production problem right now that means that it's not going to work for me and a subset of users and not clear quite which subset. It's not able to do it right now, that means that it's not going to work for me and a subset of users and not clear quite which subset.

It's not able to do it right now, which is too bad and running slash login doesn't do anything. But it will work for you and more than that, you could put in any instruction you want, you can put in and redo my read me and write me a new document, whatever you want, you can put it in there and it will go off and do it and you should experiment. And once you've done that, you off and do it and you should experiment.

And once you've done that, you can do slash tasks and you'll see a list of what else is running out there. And that's pretty cool. And yeah, these are all unfortunately I've got nothing there, but you will have things if you've just kicked something off and you can kick multiple things off and have them all off and running as different tasks at the same time.

Just as you could, press plus and have lots of them running on your own box. But it doesn't need to be on your box, it can be out there on the cloud running in a little sandbox environment. And when it completes, you get back the results.

And I should mention that the work that's happening on the cloud, when you kick it off, the full context of the conversation so far is sent off to the cloud. So it can continue at work. It's already been doing up to that point.

And that's pretty cool. Okay, so that's the first way to do it. The second way is that you can also just call from the command line.

I've got add a claw code. You could just say clawed dash dash remotes and then just put a command in here like again, what is two plus two but or something more meaningful. Now this is also not working at the moment for me, but it will work for you.

You should try it. You'll see. It's great.

And for me, I'm going to get an error message. There we go. Unable to create remote session.

Thank you, anthropic, but it's been that way for a couple of days. But I'm sure it'll be fixed very soon. It'll certainly be fixed by the time you see this.

And so you should try it and see it. But luckily for us, there are another three ways to do it. They'll all have some differences and are the ways that I would typically do it and that's what we're gonna do next.

Let's go for number three. And number three is to go to claw.ai/code, which comes up with this kind of interface. And the first time you come into this, this should have happened in the previous flow when we first came into it that they call the onboarding.

You may have needed to set up an environment and the first time it does it, so this comes up like this and it asks you whether you, the network access, it does it actually be like three big buttons on the screen. Do you want none trusted or full and trusted is the usual one to pick there. And this is known as your cloud environment and you can think of it as a setup of the thing out there on the cloud that is able to run things remotely.

And what you can then do is pick a repo, which you can see I've been playing around with this, but finally is the name of our repo. And then finally you can give a command, and that command will then run on the cloud. This is a web browser.

This is a little cloud code thing. If I say what is two plus two, which is again not the best use of Opus 4.6 and you could see it calls the session. Basic arithmetic expression, starting cloud code, all this thing is happening, somewhere this machinery is spinning up, trillions of floating point calculations are happening in order to calculate 2+2 and it does indeed get the right answer and we could continue the conversation there or we could put a fresh chat message right here.

Okay, so let's put this to actual work. I'm saying please read all the documents in the planning directory, then design the market data backend in detail, write a new document called market data design that has code snippets and examples to implement all the market data functionality. That's a good task, let's assign it.

### Deep dive

So we're doing this in a web browser. So off on the cloud, it's launched a new session that's happening right now. Claude code is spinning up in an isolated environment.

It's reading all the documents. And this is all happening. My machine is idle.

Nothing's happening on my machine. I know you get it. So it's all running and I'm going to let it do its thing.

And then I'm going to hope to see that in GitHub, there's going to be a new file created for the design of our market data. I'll see you in a sec. So one thing I'll say is that Cloud Code on the web is a bit slower, a tad slower than running it locally.

This just took 10 minutes to write a document. And it's also a little bit flaky. It's called a research preview.

You can see it says there may maybe by the time you see it, it's got a bit more stable, but I had to ask it twice because one of the times it just seemed to sort of stop and be like, "Alright, that's it. I'm out. Peace out." But ask again and then just being a bit insistent and waiting and being patient.

And it has now done something and it's written 1490 lines. And if I flip over to the GitHub repo, you'll see at the top here that there is indeed something that's been pushed that's waiting for a pull request. So we can see what it's done and choose whether or not to accept it in GitHub.

And so we'll do that. I'll press this compare and pull request button. Up it comes.

It says comprehensive implementation update for the market data subsystem. And here it is. It's made a file called market data design.

It's put it in the planning folder and it's a big old document with lots of stuff about how it should work and some code snippets and other things. This all looks like it's been very thoughtful. I'm going to take its word for it.

I'm gonna think that that's a nice bit of planning that's been done. We will go ahead. We'll press the create pull request button.

So that we do this, then we are going to merge in this request, confirm the merge, and that is now going to be part of the main branch. So that if it says merged up here, if I go back to the code, and if I go into planning, we will see that hopefully yes, market data design.md is a new document in here. This document was written in its entirety by Claude Code.

Here it is with a table of contents with Claude Code running on the web. It's a recap. I've shown you three ways to run Claude Code remotely, using the ampersand in just in a Claude Code session running locally, using Claude-remote from computer, from a terminal.

The third way is by going to Cloud.ai/code and then using Cloud Code on the web, just in a browser, which is kind of cool. And now for the fourth way, the fourth way is if you have the Cloud mobile app on your phone, you open it up, the main navigation has a, it says chats, projects, artifacts, and then it says chats, projects, artifacts, and then it says code. And if you tap there, then it will come up with a list of the sessions, the same sessions that you had listed out just there on the screen a moment ago.

And there's a black button that says new session, and you can press that, and it's exactly the same interface that we were just looking at. And basically we can do exactly what we just did from your phone. You can give it an instruction.

I want you to write this document. I want you to build this feature. I want you to do this and then submit it.

### Putting it together

And then when you come back, there will be something ready for you to build a pull request and merge in your GitHub repo. And you can drive it all from your phone and you can have many sessions running. You can kick off multiple of these from your phone.

And I don't know why that feels so cool, why that's so much better than just being able to go to a web browser and do it. But somehow it does. And you should do it just so that you've had that experience of bringing it up.

And you should pick some moment to do it, like when you're out at dinner somewhere or something. And you just sort of casually drop in, I'm just going to my team work on a few, a few bits of, few features that they're going to build for me just a second. And then I'll check it out over over dessert.

So yeah, you should do that. That is the fourth way to drive GloD code remotely. And now a drum roll please for the finale, for the fifth way to run GloD code on the web.

I bring you to GitHub right here. We are in GitHub. We are looking at the finally repo.

Here it is, and I want you to flip over to issues. Now we're in a GitHub issue. No issues, it's a nice state to be, but we're gonna make one.

Press new issue to come up with a new issue. And the name of the issue is going to be build, complete, market, data, backend. That's going to be what we're about to do.

Okay, let me paste in all my instructions. I want you to read all the documents in the planning directory, then build the complete market data backend, including an interface to a provider of market data, a unified market data interface, and a market data simulator. All of that with full unit tests.

That's what this issue is about and I'm going to add the immortal tagging at Claude. And with that simple instruction, I am saying that I want Claude to do this work for me. That's it.

And now with that, I'm just going to press the create button. So that is something which I have, I have messaged, I have, I've tagged it as being at Claude. That's how I want this to happen.

And what we are hoping is that this issue is going to be one which is going to be sent to anthropic to our Claude in the cloud to take care of this on our behalf. And just a few seconds later, this appears suddenly out of nowhere. I did nothing.

I just pressed to enter suddenly Claude, Claude bought now. Claude code is working. I'll analyze this and get back to you.

View job run. And so with that, just by virtue of tagging with Claude, we have launched a Claude instance that's running, doing stuff there as it's to do list. It appears, again, I didn't touch it, I promise.

It appears there, all within this GitHub UI, it's often running just because we tagged it in an issue. This makes all of those shenanigans a few minutes ago worthwhile, right? This is really cool.

So you can now just create issues in your repo, tag-clawed, and have something spin up in the Cloud, and have it run for you on this. Look at that. It's read all the planning documents that got ticked off.

This time you saw my hands were up here. I was gesturing. You knew that I didn't do anything.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

You can put an ampersand before it and then that same thing will not run on your computer, but it will spawn, anthropic in the cloud and run it and get you back the answer. But that's the thing that has a production problem right now that means that it's not going to work for me and a subset of users and not clear quite which subset. It's not able to do it right now, that means that it's not going to work for me and a subset of users and not clear quite which subset.

## Practical tips

- This is a little cloud code thing. If I say what is two plus two, which is again not the best use of Opus 4.6 and you could see it calls the session. Basic arithmetic expression, starting cloud code, all this thing is happening, somewhere this machinery is spinning up, trillions of floating point calculations are happening in order to calculate 2+2 and it does indeed get the right answer and we could continue the conversation there or we could put a fresh chat message right here.
- And I don't know why that feels so cool, why that's so much better than just being able to go to a web browser and do it. But somehow it does. And you should do it just so that you've had that experience of bringing it up.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

So obviously this is going to take a while. The fact that it took 10 minutes to write the documents means that it could be off taking a long time over this. But just think about how you could set up a ton of different issues. A bit like we set up juridicates last week, and you could have lots of clawed code instances working on them in parallel, and that's cool.
`;export{e as default};