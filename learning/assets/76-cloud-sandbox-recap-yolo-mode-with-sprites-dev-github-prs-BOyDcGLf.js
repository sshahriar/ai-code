var e=`# Cloud Sandbox Recap YOLO Mode with Sprites.dev & GitHub PRs

> Week 3 · Day 2

## Overview

Okay, tons of cool stuff just happened and it's happened too fast. But let me let me quickly recap what it just happened.

So first of all, I used one of the the prototypes that we went through in week two, which is to press control. Oh, to look at the full conversation, to see what was going on and to satisfy myself that indeed, most of the tests passed some failed and it correctly accounted for that.

So that was a nice thing to do. Next up, I asked it to push its changes to GitHub.

## You will learn

- Understand the main ideas covered in **Cloud Sandbox Recap YOLO Mode with Sprites.dev & GitHub PRs**
- Follow the practical walkthrough from Week 3, Day 2
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

And that didn't work because we're not logged in to GitHub here and it told me you have to log in to GitHub with GH auth login, something that we just covered, I think, yesterday. No, no, earlier today. So I stopped Cloud Code with a Control-C twice.

I did GH auth login and it spawned a window on my computer, even though we're in the cloud, I logged into GitHub and then we were logged into GitHub. I then typed "claud" to go back into Cloud Code. But the conversation was started again from the beginning and I just typed "slash-resume" and remember from the beginning of week two that /resume just takes us back to where we were and I could just say, you can see, I said right here, okay, I've logged you into GitHub, but please try now.

And sure enough, it made, it already made a branch, it then pushed that branch to GitHub, and it told me it's created a pull request, and this is now ready for my review on GitHub. Let's go take a look. So here it is, here is the finally repo.

There is indeed a market data review. Let's compare it. Let's take a look at it.

Here it is. It's got this market data review.md. There is all of the information, including some of the problems with it.

And so let's say create a pull request, and let's merge it, confirm the merge and we are done. Fantastic. Well now I'm a role here.

I'm enjoying the fact that we're operating in the cloud like this and we can just keep going. So I can switch to mass domain and to a pull and to a pull. Then, please, then please carry out all the fixes and improvements that you've documented in the review file.

Keep working until all tests pass and the product, the market data, the market data backend is ready. Then push your new branch to get up. That's it.

### Deep dive

I'm running that. It's all going to run in the cloud, again, on sprites.dev, in a YOLO world where it can do whatever it wants because we know we've got it nicely sandboxed. It's not touching my computer.

it can't do damage to me so there we go this is so efficient because there's no more of this permissions approval nonsense it's all running it's going to do its thing and uh i will check back in when we have a working market data backend and i tell you it's just been the most amazing experience sitting here watching this happening i haven't approved anything. It's been working and working, fixing bugs one by one, rerunning the tests, more passing, reporting on problems. And then at the end it created a branch, it submitted the the the the push, everything just happening.

And it's it's created the PR, it's ready for me to review it. And I've got this sense that it's super productive and lots of going on, lots of things going on, and yet it's also secure. It's happening in a way that is totally sandboxed.

So it really feels like I've got the best of both, which is a great feeling. And I continued a conversation with Claude. I gave it a bit of feedback on the changes that are made, made some more changes.

There's now a PR that's ready for me to review. Here we go. now a PR that's ready for me to review.

Here we go and we're going to have the PR to merge this in and merge and confirm merge and this is fixed and it also incorporated the extra change I asked as well and so everything is now included in and it's all successfully done. That is finished. So we have successfully carried out a bunch of work in our remote sandbox, courtesy of sprites.dev.

And one final point to make on this is that you don't need to just use this for Claude. You could use this, of course, for codecs, for open code, for whichever one you have picked. It is ideal for running in a sandbox regardless of your platform.

And with that, that's enough for today to remind you one more time. The three different approaches that we use today in blue. The first thing we did is using the built-in slash sandbox, which is a sort of cheap and cheerful way of basically like having your own Docker container.

### Putting it together

It's like a lightweight OS level, It's like a lightweight OS level, clored code built sandboxing, running on your machine. We did that, it was easy. In purple, this is where you take advantage of anthropics, remote running, remote execution with sandboxes built in.

And there's a bunch of different ways of doing it. Some of them didn't work for me, but we'll be working by now, you should try them. But some of the ones that did work was using the web interface, using the mobile app, which was cool, and then the coolest of all was going to GitHub, putting in an issue, it could also be like a PR, and then tag in Claude, and watching it, like pick up that issue, running it in the Anthro-Pick remote box, and then just raising the change at the end of it, pushing its branch, amazing.

And then in yellow, after doing all of it, pushing its branch. Amazing. And then in yellow, after doing all of that, we looked at a completely different approach, which is when we don't use Antropic in the cloud, we use a third party, in this case, the company fly.io, that has this offering sprites.dev.

We use that. It's one of the new ones that's really fast, really easy to use, and it gives you like a command line interface, which is actually remoting into something running on the cloud. But we could treat it as if it was my own machine.

And it was a bit confusing because I was running it within VS code. So it really felt like it was on my machine. And we could interact with it.

We could sign into GitHub remotely. We could sign into Cloud. And then we could carry out activities.

And we could be in YOLO mode running really efficiently but feeling very Secure as we did and that was the the final approach the yellow approach running on a third-party cloud sandbox And so with that I promised you a juicy day and hopefully you agree it was a juicy day tomorrow large Cobaces a big area of concern from people when they're working with coding agents How does it perform on a big codebase, we're going to cover that, but also I'm going to throw some spicy stuff in the mix. Yeah, spice it up tomorrow.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

And that didn't work because we're not logged in to GitHub here and it told me you have to log in to GitHub with GH auth login, something that we just covered, I think, yesterday. No, no, earlier today. So I stopped Cloud Code with a Control-C twice.

## Practical tips

- I did GH auth login and it spawned a window on my computer, even though we're in the cloud, I logged into GitHub and then we were logged into GitHub. I then typed "claud" to go back into Cloud Code. But the conversation was started again from the beginning and I just typed "slash-resume" and remember from the beginning of week two that /resume just takes us back to where we were and I could just say, you can see, I said right here, okay, I've logged you into GitHub, but please try now.
- So it really feels like I've got the best of both, which is a great feeling. And I continued a conversation with Claude. I gave it a bit of feedback on the changes that are made, made some more changes.
- And one final point to make on this is that you don't need to just use this for Claude. You could use this, of course, for codecs, for open code, for whichever one you have picked. It is ideal for running in a sandbox regardless of your platform.
- And then in yellow, after doing all of it, pushing its branch. Amazing. And then in yellow, after doing all of that, we looked at a completely different approach, which is when we don't use Antropic in the cloud, we use a third party, in this case, the company fly.io, that has this offering sprites.dev.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

As you will see, and then there's going to be a kind of crescendo, because the day after is all about the swarms and orchestrators, there's all the rage at the moment before we land on our capstone. Okay, see you tomorrow. For now, take a moment to wallow in the fact that you are 80% through, 20% left to go before you have really mastered coding agents. See you tomorrow.
`;export{e as default};