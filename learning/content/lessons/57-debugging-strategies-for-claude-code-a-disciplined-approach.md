# Debugging Strategies for Claude Code A Disciplined Approach

> Week 2 · Day 4

## Overview

Well, it made quite a meal about it. It took at least 10 minutes, maybe longer.

It ended up with more than 8,000 lines in total. It built a really extensive test suite.

It did have problems because of the way I shut down that server like that. But it figured it out, it navigated through.

## You will learn

- Understand the main ideas covered in **Debugging Strategies for Claude Code A Disciplined Approach**
- Follow the practical walkthrough from Week 2, Day 4
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

It hit the context window filled up and it had to do an auto compact, which is what it does when it realises it's going to need to compact itself. And that's always a bit of a nail biting experience for the for the voyeur, like you and me watching it doing it. And as sure enough afterwards it does seem for a moment to be confused about what it's trying to do, but it figured it out, it finished the job, and then it declared success.

And sure enough I did just bring up our NDA creator and confirmed that it's working. You can see that 76 tests passed across five suites, a bunch of different sets of tests, which is all very impressive. And then I can indeed go to localos 3000 and see that it is here.

Everything seems to be just fine with everything. Presumably, if I type in something here like the governing law in New York, we're going to see on the right there you go, you see that it does in fact update things live. I wonder if I can download a PDF before I finished you up.

I can. That's fine. It will just show the fields in there that haven't yet been filled in and I can click and see that it comes up with New York filled in there and other stuff just there as a placeholder to be filled in.

So there we go. It is working nicely and Cloud Code has built this very extensive set of tests and it has completed the task ably. And now I will just quickly go to the MCP one more time and just re-authenticate with that lesson.

I know you have to do this all the time. Up it comes, approve, scroll down, accept, back we come to here. And now let's say please merge the PR locally and push to main and switch the branch to main and mark this issue PL3 done in JURUP.

That's our final instruction. That should polish this off. Let it get on with it.

I'll see you when it's done. And it's done, and it's successful, and that was too easy. It seems crazy.

We built this prototype application in a matter of minutes, hardly doing anything. We just had to tell it to write some tests but I didn't need to because it was already working but now it's also written a bunch of tests. Now the bad news is that I wanted to go through with you today, debugging strategies and for that I wanted it to have a bug.

I was sure there was going to be a bug and then we'd go through and fix it together and what we may have to do is I'll tell you about the strategy we would have followed and We'll no doubt hit pugs tomorrow instead and go through the strategy with it then so here's my recommended strategy for going after debugging It begins by taking a snapshot when you debug you can go off down a tangent Sometimes called coke can go way off track And so it's important to do this and I mean do a git commit of where you are It's important to do this and I mean do a git commit of where you are. Don't just trust the rewind functionality because as you know that will only back out changes made directly to file, file edits made by Cloud Code. It can't affect things that are side effects of running a script.

So do a git commit to start with. Then particularly for small issues for things that just seem to be like something that is just bashed up against. The first mode that one tends to be in is just simply take the stack trace, the error message, whatever it is, copy it and paste it as is into Claude and just do that and repeat it fixes something, just do it again and again.

You don't even need to explain I was doing blah blah blah and this happened just focus on efficiency, copy, paste, copy, paste. Usually for simple problems, Claude gets the joke, understands the context, it figures it out, it fixes it and you're on. And that's a super productive way to work.

So that's typically the first kind of mode that I'm in. But if that doesn't yield good results or sometimes it just makes things even worse, I will revert back to where I took the last commit and do things in a more organized way. And if that quick interactive approach doesn't work, then I change tactic completely to a more disciplined, regimented approach, where I focus on a file, a markdown file that Claude should write to.

### Deep dive

I start by saying, this is the issue I needed to reproduce it consistently, every time and document how you do it, document it in debug.md or whatever.md. document it in debug.md or whatever.md. Then I want you to investigate.

Look at all the related logs, put in extra logging information, get all the information you can, gather information, investigate deeply, come up with hypotheses for what could be causing this and document them in debug.md. Get everything recorded out there. Include in that doing a web search for other people that have had these problems.

And by the way, there is a classic clawed problem to watch out for. One of the things that Clo code is famous for and the other tools too is it sees it finds online like a reported stack overflow issue or a git, a GitHub issue that's recorded there and it sees that it matches the problem that it's found and it sees someone's complained about it and there's a workaround and it says something like "I found it, this is the problem, it's a known problem" that's always one of my like like red flags when I hear that. What it doesn't notice is that this was an issue reported by maybe one person three years ago and it just takes a sense of perspective and frankly some common sense to see that this is in fact a sort of one-off thing that is no way that this could actually be the same thing that you've got.

It's just someone else out there on the internet had a very similar problem three years ago, which no one ever responded to because it wasn't a big deal. But Claude will say, "Found it!" And this is what to do. You have to install a prior version of some package and it's all over the shop.

And so having that sanity check to say just because you found one other recorded incidents of this issue, do you have evidence that this is a common issue? Did more than one person report it? Does it really seem like this is the same thing we're encountering?

Like you got to challenge it hard on things like that. Jumping to conclusions is what these models often do, even though we didn't see that earlier, but it does happen and that's the kind of thing to watch out for, seizing on one reported incident that happened a while ago. So investigate, hypotheses, and sanity check the hypothesis that you see.

And as a result of that, it should come up with a root cause that it has identified as being the root cause of the issue, in which case it needs to demonstrate it. Prove that that really is the root cause and document the proof in debug.md. And you're guiding it through it.

You're giving it these instructions. Okay, if that's the recourse, prove it, document it, write it to.md. And then of course, the next step is now you know the root cause, now fix it and prove that your fix consistently fixes the issue.

You've reproduced it consistently, you've applied your fix and now it works consistently. And finally document lessons learned in claud.md, come back and realizing, recognizing what you did, learn from it for this project, put down some tips so that you don't repeat the same mistake again because often once you clear the conversation or there's a compact, suddenly it's forgotten about this and it repeats, which is awful, which is the worst. It's infuriating.

You don't want that to happen, document it in claw.md. This is the approach I go through. It's disciplined.

It's a bit frustrating, but it tends to yield good outcomes. And it is common to find it going off the rails and going off on a tangent that proves to be a red herring. And then I would typically go back to my Git commit.

I'd wipe everything out. I'd put a note about what the problem is not. And then I'd start it all over again.

There was the kind of thing that it loves to latch onto. When it does, it says it with such confidence. It was said things like, no, an LLM cannot both have tool use and structured outputs in the same LLM call.

### Putting it together

This is the problem. It's a known issue and as a result." And then it rewrites everything. And when you look back, it's a completely fictional, fictional issue.

Maybe someone reported something about this by mistake years ago. And now I often find that that particular thing has happened two or three times to me when it suddenly latches onto that and starts rebuilding things and you're like no So that's a moment when you stop it you you restore from your last commit and then you go and tell it This is not the problem try again and another hot tip that works really well is Using a different agent and I mean using a different LLM So it's time to pull up codecs and anti-gravity, one of the other ones we did in last week back in the IDE again and give it the assignment instead, make it go through this process because it's like saying having a second pair of eyes, but because each model has gone through a different training experience and has some different prompts and it is just set differently. There's every chance that it will discover something that Claude has missed.

And so doing that is a really great technique to have multiple different LLMs, totally different prompts and models work on the same problem. That is a pro tip for sure, particularly with really hard problems. And as a final point, there is in fact a skill.

There are in fact a bunch of skills for debugging. This I think is the most popular one as of right now, a systematic debugging. And it's a really good one.

If you read through this, the skill is brilliantly written. I've actually not tried it myself, but I really want to because it's a bit like my five steps here, but it's a lot more thorough. It has a lot more about searching the web.

It has a lot about really hammering home about finding and proving the root cause, which it calls the iron rule. So read, read the skill. It's great.

And try it out if you get stuck on debugging. And if we get stuck in the next week and a bit, maybe we'll try it ourselves. That would be fun.

But that's a good skill to know. And if you look under skills and debugging, you'll see there's a ton of them that you can experiment with as part of trying to problem solve. And with that, a quick reminder, a recap of what we did today.

We were able to read issues from Jira using an Atlassian MCP server. That was then flowed through into Cloud Co where we were running the feature dev plugin that took it through the discipline seven step process. Well, there was some reason it skipped step six, but we made it go back and do it.

And then that used the GitHub MCP server to create a PR and then merge it. And all of that ran into end and allowed us to deliver a full feature. And it worked, which is super impressive.

And of course, the cool thing is that all of this was running inside Cloud Code, all of these different bells and whistles of using Cloud Code really effectively. And it was just that one command that we typed out, featured Dev, come up featured of, please implement your issue PL3 with a next-year application and directory with front-end and razor PL when done. Bam, that's all it took.

And it all ran. And so again, looking back at the kapathy tweet, this is the kind of way that you can build a workflow that is robust and that is thorough and disciplined and really uses Cloud Code to the max.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

It hit the context window filled up and it had to do an auto compact, which is what it does when it realises it's going to need to compact itself. And that's always a bit of a nail biting experience for the for the voyeur, like you and me watching it doing it. And as sure enough afterwards it does seem for a moment to be confused about what it's trying to do, but it figured it out, it finished the job, and then it declared success.

## Practical tips

- It hit the context window filled up and it had to do an auto compact, which is what it does when it realises it's going to need to compact itself. And that's always a bit of a nail biting experience for the for the voyeur, like you and me watching it doing it. And as sure enough afterwards it does seem for a moment to be confused about what it's trying to do, but it figured it out, it finished the job, and then it declared success.
- I was sure there was going to be a bug and then we'd go through and fix it together and what we may have to do is I'll tell you about the strategy we would have followed and We'll no doubt hit pugs tomorrow instead and go through the strategy with it then so here's my recommended strategy for going after debugging It begins by taking a snapshot when you debug you can go off down a tangent Sometimes called coke can go way off track And so it's important to do this and I mean do a git commit of where you are It's important to do this and I mean do a git commit of where you are. Don't just trust the rewind functionality because as you know that will only back out changes made directly to file, file edits made by Cloud Code. It can't affect things that are side effects of running a script.
- You don't even need to explain I was doing blah blah blah and this happened just focus on efficiency, copy, paste, copy, paste. Usually for simple problems, Claude gets the joke, understands the context, it figures it out, it fixes it and you're on. And that's a super productive way to work.
- And by the way, there is a classic clawed problem to watch out for. One of the things that Clo code is famous for and the other tools too is it sees it finds online like a reported stack overflow issue or a git, a GitHub issue that's recorded there and it sees that it matches the problem that it's found and it sees someone's complained about it and there's a workaround and it says something like "I found it, this is the problem, it's a known problem" that's always one of my like like red flags when I hear that. What it doesn't notice is that this was an issue reported by maybe one person three years ago and it just takes a sense of perspective and frankly some common sense to see that this is in fact a sort of one-off thing that is no way that this could actually be the same thing that you've got.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

And that is a wrap on day four of week two. And tomorrow is when we bring all of this into a project, now that we're really good at driving Cloud Code. And I'm so excited to tell you that that brings us to the 60% point, 60% of the way through. And hopefully you really do feel that big step that's been made now and that we're ready for tomorrow, ready for a big project, bring it on.
