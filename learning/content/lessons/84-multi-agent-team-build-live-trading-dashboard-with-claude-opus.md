# Multi-Agent Team Build Live Trading Dashboard with Claude Opus

> Week 3 · Day 4

## Overview

I should mention now that I've been asked to approve a few things, a UV add from the database engineer and now creating the next project by the front end engineer and that's great. I haven't done dangerously skip permissions, which I might have done YOLO mode if I were using the sandbox that we were looking at before.

But in this case, it's good that I get to approve these things as should you because I want to make sure I know what kinds of commands are being run, particularly when one in this kind of chaotic setup. And it's now a few minutes later and the first, the database engineer is completed, the SQL setup, and so the backend engineer has been kicked off.

And you can now see that that is happening. There's a backend engineer.

## You will learn

- Understand the main ideas covered in **Multi-Agent Team Build Live Trading Dashboard with Claude Opus**
- Follow the practical walkthrough from Week 3, Day 4
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

If I do my shift up and down, you can see that we can flip between now the team lead, the backend engineer and the front end engineer. It's interesting that it is a bit more serial than I was expecting. I guess I had some sense when I put in that problem to the beginning that they were all going to kick off and start working.

Because you could imagine you could begin the back and work before the database is completely finished. And so it is quite serial. And that does make sense.

That is a more structured, organized way of doing it that probably leads to better outcomes, a bit less chaotic and more managed. So it's probably a good thing to see that. And I imagine that by tweaking that initial prompt, I could have encouraged it to try and be a little bit more, put everything in parallel, run more concurrently, but you'd probably get worse outcomes.

And I'm happy to see the backend engineer is now complete. The backend engineer has done 121 passing, all 101 tests are passing. It's been marked as complete, it's being shut down again, a bit more serial than I was expecting, and then spawning the AI engineer now unblocked.

And in some ways you could also argue, perhaps this is sensing that the AI, the LLM engineer and the backend engineer could have been the same sub-agent, although perhaps it's good to preserve some context and keep them as separate, but they didn't need there to run concurrently or at least it was perhaps ill advised certainly our team coordinator felt it was ill advised to run them concurrently and I notice I'm pleased to see that it's pointing out that it needs to be through open router. So rebrass I'm going to be interested to see if it ends up using the skill properly as it should and I imagine it will and we will be able to tell from either it knows how to assign it to Siribras. This seems to be happening.

I can see that we've got now, oh now we have more agents running. Let's take a look. We've got the team lead, the DevOps engineer, the front end engineer and the LLM engineer.

They are all running. So for the first time we have four subagents, not subagents, four agents running in our team, it's all happening. There's just tons going on now.

You can see that lots of different tool calls happening, and that's asking me now whether it can proceed with running some tests. Absolutely. I'm going to press two, Chamod commands.

Okay. So it's wanting to give power to run scripts. This is a clear case of when I should press one and not two.

I'm happy for it to change the ownership of these scripts to change them so I can execute them. But I want to approve that every time. And let's see what's this, that one, this is for testing.

I'm happy for to press two for that. So making good decisions about whether to approve only in this case or always approve is important. We see these are all running.

You can see how many tool uses have happened already and how many tokens are coming out of these, the front of engineer and 93,000 tokens. Lots going on. Docker build.

I'm happy for it to be able to do that. I'm pressing two for that. That is the DevOps engineer running that.

So you can see and again, that's fine. You can see lots going on. I'm approving for each of the different workers.

And I see stuff as a Docker just launched. So I wasn't running Docker. And it saw that.

That was my mistake. I should have opened Docker. It just launched Docker and started it.

Good for it. Amazing. And that's definitely an example of something that Opus 4.6 could handle, that models couldn't handle in the past.

That's my mistake. And on it goes, see you in a second. Okay, we're now done with everything except it's explaining, just the LLM engineers done, the front end engineer is done, we're just waiting for the DevOps engineer to finish building, and then it's going to pass over to the integration tester.

And I'm interested, I'm a bit concerned that if the integration tester finds problems, how is it going to be able to to data get back to the the agents that have completed. So that's going to be one to watch out for. See how that coordination works.

Okay, everything has now completed except the integration tester. And so it is spawning the integration tester as it says the final agent. We'll see how it handles any problems that it has, but that is now the only other agent running except for our boss, our team lead.

There you go. I just press shift up so I could see that. And I remember control T is how I toggle the task list.

There's the task list. Control T toggles the task list off and on and shift up and down is how you flip between the different team members. Good shortcut keys to know.

Now it's running the integration tests. We'll see how this goes and then we see what handles any problems with the integration tests and then we'll see where the thing works. So it's been testing for quite a while, I have to say, it's been going for 11 minutes and I can see here the integration tests have found five APA response mismatches causing a front end crash.

### Deep dive

And the team leaders good catch. Yes, fix blah, blah, blah. And it says the integration test that is now fixing the response format mismatches.

So I was hoping it was going to be the original front end developer that would fix the problems. I guess it wants the integration test to do the fixing. I will let it do its thing.

I'm not going to contradict. I will let it do its thing. I'm not going to contradict.

We will let it finish, see where it gets to, see if that was a good pattern, or maybe you should have prompted it differently at the beginning, or maybe even I should jump in now. But for this one, I would rather just let it be, let it complete, let's see where it gets. And that is a wrap.

So it completed all of the tasks. It found the bug with the five API responses. A minor note, the CSS let overlap.

But non-blocking, I guess we'll see that. To run the app, it's got the instructions. Well, we shouldn't need to do that because there should be -- oh, there we go.

It says there's a script, start Mac. It's finished. The teammate shut down gracefully.

The team is cleaned up the finally project build is complete six agents six tasks all done the app is ready to run so there we've got lots of stuff we've got lots of files changed fair enough I think it's time for us to try this out okay I'm gonna start a new terminal window I am going scripts slash start Mac. Oh, that's not good. What have we got here?

Start, sorry, start_mac. (laughs) There we go. Okay, here we go.

And it's coming up at localhost to 8,000, but that didn't seem to run. There we go, bam. Okay, that's pretty cool.

This is the market data watch list on the left. Okay, that's pretty cool. This is the market data watch list on the left.

You can see that it's flashing. We can see everything going on. We've got an AI assistant, we've got a portfolio, we've got 10,000 in cash.

Let's see now, what do we do? We can do ticker. Let's try and do some buying.

Let's buy some JP Morgan stock, why not? Two, buy. BAM, there we go, JP Morgan has appeared here.

The heat map shows it at zero. This is amazing. Okay, now why is there we go?

It has just changed. The heat map has changed that trade. And this is of course all fake market data.

That is a negative and now it's a positive. That's nice. As we go into the plus, what else should we get from here?

Let's add in some Google stock. Take a Google quantity and look at that the cell, just moved across, that's a little bit of a blip, let's buy that. Now it comes in our portfolio heat map right here.

What happens if we click on here, what does this price chart here give us? I'm not sure. This is the portfolio P and L showing right here.

This is all pretty cool. It's got the right color scheme with the, my favorite colors but also looking very active. This is with, with perhaps a couple of things that might be improved.

It looks like we're getting some zero shot success working first time but now we have to try out the AI assistant. Okay. So let's go over to the AI assistant and say, please add SPY to the watch list.

See what it does. It's thinking about that. SPY has been added to your watch list and there it is on the watch list.

It doesn't seem to be changing though. That's interesting. Okay, then we'll say please buy one share of V.

### Putting it together

Let's see what that does. And it just did executed purchase of one share of V at market price. Bam, and there it is on the heat map.

And this heat map is obviously like one where larger boxes represent more, more portfolio weight in dollar terms. That's really cool. There's a lot to take in here.

You can tell I'm slightly frazzled as I try and absorb all of this. This seems to be a bit of an error right here that this price chart doesn't seem to fill in, but this is all working. It's able to respond here.

The overall portfolio P&L, this line appears not to be moving, but it's pretty good. I would say that this is an impressive setup. Yeah, you can see everything is happening here.

The portfolio price is adjusting, the amount of cash I've got has come down of course. It's looking really excellent. Please give me some trading advice.

See what it says if we do this. Your portfolio is cash heavy with small position and Google. Consider rebalancing.

Oh and I just noticed that the portfolio P&L is changing like this. That's great. Please do this for me.

Let's see how that does. Just giving it a request to do some portfolio rebalancing. Everything appears to have stopped.

That's thinking. That's caused it some consternations. There we go.

Sold your two shares of JP Morgan to free cash for rebalancing. Okay, fair enough. I don't think that was a great move, but if what it wanted to do was to bring in more cash into equity, but there we go.

It's working, it's cool, it's amazing to see this. It definitely has the live dynamic sense. And most importantly, it's hanging together.

It's the functionality, is there, it's tested right. A couple of quibbles like this section here that seems to be a bit, a bit, a bit unawesome. Other than that, I give this high marks.

How about you? Okay, well, I've closed that window down. I'm intrigued to see that I can bring it back up and it just continues where it was just as we'd specified.

Now, what we could do now is go in and fix those various bugs, give it some feedback and fix them. But I think it's more interesting for us to give this zero shot idea another try with some other workflows. So let's now stop this server scripts slash stop underscore Mac dot shell.

It's stopped. Okay, great. And now we're going to do a git status and see everything that's in here.

There's a lot of stuff that's been built. Okay. There's a lot of stuff that's been built.

Okay, now I'm going to do a git add dot. That's putting everything into git. And so that's staged for commit.

Let's do another git status and see what that looks like. Now lots of things have been set up here. And let's just make sure that there's nothing in here that looks concerning.

It hasn't checked in. Node modules or anything. No, everything is correctly get ignored and there's a doc.ignore and there's a.env.example but not a.env file.

That all seems great. Okay, then just double checking. Good, then what we're now going to do is now do a git push but to this branch, we're gonna commit and then push to agent dash teams.

So git commit minus m agent teams v1 git push origin agent teams and off it has gone. So that is now been pushed to that branch agent teams. Excellent.

Look at what we can do now. Thanks to the power of Git. We can do Git checkout main and all of our code flips back to where we were before.

Bam!

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

If I do my shift up and down, you can see that we can flip between now the team lead, the backend engineer and the front end engineer. It's interesting that it is a bit more serial than I was expecting. I guess I had some sense when I put in that problem to the beginning that they were all going to kick off and start working.

## Practical tips

- I'm happy for to press two for that. So making good decisions about whether to approve only in this case or always approve is important. We see these are all running.
- There you go. I just press shift up so I could see that. And I remember control T is how I toggle the task list.
- Sold your two shares of JP Morgan to free cash for rebalancing. Okay, fair enough. I don't think that was a great move, but if what it wanted to do was to bring in more cash into equity, but there we go.
- Let's do another git status and see what that looks like. Now lots of things have been set up here. And let's just make sure that there's nothing in here that looks concerning.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

Gone. Okay. Great. Now on to the next.
