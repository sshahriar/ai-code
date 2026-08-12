# Gastown vs Claude Agent Teams vs GSD Multi-Agent Orchestrators

> Week 3 · Day 5

## Overview

Well, I was wrong to be too confident. When I went to the website after asking it to bring it up, I got a page cannot be displayed.

I got a total fail. Nothing was there.

So I went back to the mayor and I said to the mayor, there's nothing there. I didn't try and debug it.

## You will learn

- Understand the main ideas covered in **Gastown vs Claude Agent Teams vs GSD Multi-Agent Orchestrators**
- Follow the practical walkthrough from Week 3, Day 5
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

Didn't diagnose it myself. I just said, please just go ahead and fix it. Slinger tasks.

Get the polecats involved. Let's make this happen. And bam, it did it all over again.

Lots of things happened. All of these six Paulcats, eight Paulcats all started up. Things happened and now we're coming back for the second time.

And I'll mention again that we should give it some credit because it's really starting from absolute nothing. The other times we've had a build using the market data foundation and the extra documentation for market data. This time it just started from the spec, the plan.md, and that was it.

So it's a total build from absolute scratch. That's what it had to do. And it did it all massively parallel.

So it's very fast. By far the fastest of any of the things that I've done. And a couple of other things to mention, in the terminology, you saw me struggling there a bit.

But I do now remember remember the thing called refinery that was running was a special agent, a special worker that is responsible for doing the merge requests, the MRs, and that's merging in the work that all the others are doing. So the reason that that was idle for a long time is because it wasn't there were no MRs for it to merge, and then it would suddenly pick up an MR when one of the pullcats was done, and that's why you'd see it like kick into gear and the reason that there was a red refinery there was because of that other project I told you about that I'd run before called finally so it had its own refinery that was kind of dead and that that's what was going on and the process called witness is a thing responsible for watching all of this and notifying I think it notifies the mayor if anything were to go wrong so that's how it all hung together. And now without further ado, let's see if we have a product.

All right, here we go. I told it to bring it up on port 8,002. Here we go.

We do have a product. We do have a product. And it looks remarkably similar to our other products, which at the end of the day is not super surprising because we suspect things out quite carefully in that planning document.

And it was fairly precise and also after all it's always cloud code it's always opus 4.6 that's building all of these but it's interesting that we end up with very similar results. So here we have something we've got over here on the left and it's interesting this time it says select a ticker from the watch list and maybe that's what I was meant to do in the other one. If I think if I click here yeah look at that then we get to see the one that I just clicked on appearing here in this chart.

And what happens now, if I click here and I say Apple quantity three and I click buy, then bang, Apple appears in the portfolio heat map over on the right. And I can also do Netflix and we will buy four Netflix press by and the heat map is updated over here the portfolio. We've got positions here It's super impressive Particularly again, I mean I can't really call it zero shot the sub because it took it took an iteration didn't it?

So so it took two iterations, but I didn't give it any particular feedback I didn't help it troubleshoot it figured all this out for itself and this whole thing is running and it's alive. Wow, it's time to try the LLM part. All right, so over here I'll click in the chat.

I'm gonna say hi there. And let's see what happens. Takes a bit of time.

Hello, how can I help with your portfolio today? I'm going to say, please buy three shares of JPM. Let's see what happens.

General, please. Sure. I will place an order.

### Deep dive

BAM, look at that. JPM Morgan appears here, nice and green. I like to see that.

And it's all updating everywhere. The AI chat works. That's absolutely amazing.

This is great. This UC right here is the result of running gas town, building our entire project, including the market data simulator and the market data interface. The whole thing built from scratch and running and working.

And so to recap, if I haven't completely confused you, we've been talking about using orchestrators or patterns for allowing us to manage multiple agents working together but with some level of coordination between them to allow for more predictable outcomes. And we've really looked at three of them and we could put them alongside each other in a line from the most kind of controlled and disciplined through to the most crazy. The GSD, the Getch Done is perhaps despite the the radical-sounding name, the one that is most disciplined, it is from the family of spec-driven designs.

When there is a clear spec, it uses markdown files very cautiously, it goes through a period of plan, of reviewing, of execution, and then validating, and then an audit at the end of it. So it's this very reliable, disciplined process, which lends itself to bigger projects, to human in the loop, and to being able to deliver measurable and predictable outcomes. Okay, so it's more reliable, it's more slow.

Then in the middle, we met Claude Agent Teams, and it's the experimental feature, maybe it's now more mature for you, and it's for sure, it is faster. It took five hours with GSD, it took about half an hour with Claude Agent Teams. And then we ended on Gastown.

I just gave you a preview of it. I told you you don't need to do this yourself unless you particularly want to go through the experience that I went through. Well, I see a bit of frazzled in places.

But of course, this kind of thing is emerging now. There are a few like it. Gastown is the one that's quite hyped at the moment, but there might be many, many more.

And these are ones where there is a sort of preset structure but it's ready for a lot of concurrent work. It took about the same time as Cloud Agent teams I think in total, about half an hour, but it did a lot more because we gave it the market data task as well. It built the whole thing from scratch and it just all worked.

Second time, but just with me telling it, "Hey, go and fix this." And so that was the most chaotic. It was the fastest in terms of building the most in the same amount of time and it was it was pretty impressive if a little bit bewildering and now GSD was is something which can be applied to I think all of the coding agents and Gastown is also something which Steve points out a lot in the blog post is something or in the github read me Something that can be applied to the different coding agents It's not tied to Claude code even though he first built it around it. Cloud Agent Teams, of course, is a feature built into Cloud Code.

But as it happens, that is very similar feature. Similar Agent features are built into the others. And in particular, I took a look at Codex.

And Codex has something that's also experimental, built into Codex. And I will be doing my job, but I didn't quickly give you a sneak peek of that. No surprise I'm sure you're getting the idea that I most favor the ones in the middle.

I like clawed agent teams a lot between these it was the one that gave me the experience of a lot of power without feeling like I was completely out of control but I'm sure that if you spend enough time with gastown you get really used to it. Anyway let's go check out Codex subagents. So I'm not actually going to run it and I think you've seen enough of these now.

I'm just going to show you the Codex and show you how you activate the feature and then show you the results. But I'm back in a normal terminal window and I want to remind you of sprites. Remember this, I can say sprite.dev is the full name of it.

I can do sprite list to see all of the sprites which I've got running, all of these remote sandboxed environments that fly.io is running for me. And I've got one called finally worker, the same one. And you can do sprite, sprint sprite minus s finally worker.

### Putting it together

So you say which one you're talking about. And then console. And that means I want to like remote in.

I want this terminal to become a terminal for that sprite. And that's what we're looking at right now. So if I do a, now that's I can see there's a directory called finally in there.

I can go into finally. Now I'm in finally, and this is in particular, if I do get status, this repo is got, it's on branch codecs. I created this branch called codecs.

And when running codecs inside your sprite, you just type codex. It's already installed, but you do minus minus yolo. That is the equivalent of dangerously skipped permissions for Claude.

They've got a couple of them for yolo for codex, but dash dash yolo is one way to do it. And we're now in codex in yolo mode. And in in codex, you can do slash to bring up a slash command menu, just as with the cloud code.

And I went to slash experimental, which is where you get to toggle on and off experimental features and the one I picked is called sub agents, ask codecs, there's more multiple agents to paralyze the work and to win inefficiency. And so of course I selected that. And then I just said, Hey, check out plan.md and do this." That's what I did.

It's not the only thing I did 'cause if I come out of here, if I just do an LS, you'll also notice that I renamed cloud.md to agents.md, because I remembered that Codex expects agents.md not cloud.md, so that made it work. And I think I also told it, let's have a look in scripts. cat start_mac.

We can see what we've got right here. Yeah, I wanted it to come up on port 8000 and three. That's how it should run.

So, and I believe that's that is now running. Let's do a Docker P.S. to see if it's running.

And this should tell us whether or not Docker is installed and is running. And the idea is we expect it to be running. It's not running, so I will start it.

I'll do scripts/start. And this is a Linux box, but max scripts is the same, and now it should be coming up and running. There we go.

And it is now running on port 8,003. So that is built and running. It was built in parallel.

And I gotta tell you, it was super fast. It was faster than any of them. I don't know if it just happened to be having a good day, but it was really very quick.

It took, I'd say maybe 15 minutes end to end. So it was the fastest as these experiments go of any of them, and we will see if we can whatever zero shot it, see how it is, if we try and bring it up. And of course, it's running in my sprite on port 8003.

And what I want to do is see what's happening on my, I want to be bringing up on my computer on port 8003. How's that going to work?

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

Didn't diagnose it myself. I just said, please just go ahead and fix it. Slinger tasks.

## Practical tips

- But I do now remember remember the thing called refinery that was running was a special agent, a special worker that is responsible for doing the merge requests, the MRs, and that's merging in the work that all the others are doing. So the reason that that was idle for a long time is because it wasn't there were no MRs for it to merge, and then it would suddenly pick up an MR when one of the pullcats was done, and that's why you'd see it like kick into gear and the reason that there was a red refinery there was because of that other project I told you about that I'd run before called finally so it had its own refinery that was kind of dead and that that's what was going on and the process called witness is a thing responsible for watching all of this and notifying I think it notifies the mayor if anything were to go wrong so that's how it all hung together. And now without further ado, let's see if we have a product.
- And it was fairly precise and also after all it's always cloud code it's always opus 4.6 that's building all of these but it's interesting that we end up with very similar results. So here we have something we've got over here on the left and it's interesting this time it says select a ticker from the watch list and maybe that's what I was meant to do in the other one. If I think if I click here yeah look at that then we get to see the one that I just clicked on appearing here in this chart.
- I just gave you a preview of it. I told you you don't need to do this yourself unless you particularly want to go through the experience that I went through. Well, I see a bit of frazzled in places.
- I'm just going to show you the Codex and show you how you activate the feature and then show you the results. But I'm back in a normal terminal window and I want to remind you of sprites. Remember this, I can say sprite.dev is the full name of it.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

I need to like connect to the sprite out there in the internet. But luckily there's a beautiful command I can do, which is sprite minus s finally worker, finally dash worker. There's a command that is called proxy proxy. And then you do the name of the port and that is going to take port 8,003 on finally worker and map it to my local port so I can just bring up a browser point it to 8,003 and see what's going on on there okay let's try it
