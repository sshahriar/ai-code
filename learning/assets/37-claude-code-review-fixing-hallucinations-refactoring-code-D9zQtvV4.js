var e=`# Claude Code Review Fixing Hallucinations & Refactoring Code

> Week 2 · Day 1

## Overview

So next, I'm going to press the plus button here to open a second terminal. You see the way these terminals appear as two different rows on the right there?

And I'm just going to do a git status to see what's going on here. There's just claw.md that is the one that is written.

Let's just add this in. "Claw.md".

## You will learn

- Understand the main ideas covered in **Claude Code Review Fixing Hallucinations & Refactoring Code**
- Follow the practical walkthrough from Week 2, Day 1
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

Okay, and now you click over here and to go back to "claud" running. What I want to do now is have it look at a few things. First of all, I notice the red over here is saying that there's some linting problem with page.test.tsx.

I want it to fix that, find out what's wrong and fix it. And then I'm going to want it to come in and sort out this mess with that Python module that I really hate. Okay, but you might be at a different point to me.

You might have a different code base. So rather than assuming anything is wrong, let's follow Simon Willison's suggestions. And let's just have Claude do a code review, do a thorough code review of everything.

And we'll see if it spots this problem with frontend here and whether on it also resents main.py which looks really ugly check out my main.py. Yours hopefully won't be as horrible as this. Look at all that code, enormous and disgusting.

But let's see where the code review of the entire repo repo and write results and write a report a report with actions to code review.md in the docs folder. Okay we will let Claude Code do its thing, meandering. We will let it meander, and I will see you back after it has meandered.

And while it's running, I will mention it's running three agents in parallel. You can see there's a backend code quality agent frontend and infrastructure and config, and they seem to be running together, which is kind of cool. All of this is happening.

A lot is going on in this cloud code terminal and you can see the different tokens and the tools that it is using as it reviews a comprehensive code review of the repo. Everything is happening and I will see you back when it's done. Okay, so the code review completed.

It had a comprehensive review. It came out with a bunch of different actions through which are critical. The first of them and the second of them are about the same thing.

Rotate open-routine API key, it's exposed in Git, remove.env from the Git history. The API key is in Git and it's obviously a very serious problem. If you look up here, it explains what it means that we've got an API key in our.env file, which is exposed in Git.

And the problem here is that that is false. I'm not an idiot. Obviously, my.env file that contains my secrets is a file that I put in.get.

Ignore to make absolutely sure that it would not be exposed. So this is a failure. It's a classic LLM failure because it reports it with so much confidence, with lots of if we go into the code review, you'll see if you went in there, you won't see it now because I've corrected it already.

But you put it there in very strongly worded statements. And I often get questions from students who've got something like this and they've pasted it, and they haven't said this is what the LLM is saying. They've just put something that's very authoritative.

The key is exposed blah blah blah blah and you can see the telltale signs of an LLM hallucination and this is why everything has to be checked it's a classic example it was completely false so I responded with how is.env in git it's clearly included in.kid ignore and it's not in GitHub and it responds, you're right, let me verify. You're correct. .env is not tracked.

The file exists locally, but it's properly get ignored. I'll correct the review. It's like, gee, thanks.

You'll correct the review, but it's really it's it's it's it's very destructive to so confidently make a big mistake like that. And so I take the time to take through this just so that you are wise to this, you know what to look out for. So now it rewrites things, it removes and as you can see the red is where it's removing a line, the green is where it's adding it in.

And at the end here, it says, the report is corrected, apologies for the false positive. The exploration agent read the dot e and v file and incorrectly concluded it was a get. I think it's funny that just I tell you, you shouldn't blame the LLM if you need to take accountability.

It looks like the LLM is blaming one of its exploration agents or one of its sub-agents. It's like, don't blame the agent. You should have checked.

So, you know, it is what it is. It's a good learning point to watch out for these things. But with that now, let's go and have a look at the code review, code review.md that it wrote, and let's see what it has to say.

Okay, so let's take a look here at the code review. So first critical issue is that the back end dependencies are unpinned. Okay, it doesn't seem like it's a major issue to me, it's saying that we've got dependencies here that should be fixed to a particular version.

### Deep dive

If we'd use uv, then this would have all been fine, but it decided not to use uv, so we don't have a lot version. If we'd use UV, then this would have all been fine, but it decided not to use UV, so we don't have a lot file. And this is a perfectly decent thing.

The back end test, okay, that's interesting. It says that it will fail, but I thought it would run all of the tests, but maybe that's it, it run unit tests, but not integration tests. But fair enough, the high priority, it's talking about the deprecation morning fair enough.

Playwright hard coding. Oh, that's a good one. So it saw that playwright was hard coded to run on a Mac, which will only work for me.

This is interesting. It sees a sequel injection risk here. That's a nasty one.

If it's true, missing input validation. Okay. And here's one I was hoping to see.

That's great. Number seven, of course, it has agreed with me that this main.py is a horrible, a horrible back-end file, all coded a single file, hard to maintain, hard to test, and just very bad. And then number eight is a fairly minor point.

And then we're into into smaller things here, but accessibility gaps in the front end. Docker health check missing, fair enough. Docker runs as root, okay.

These are all perfectly decent, decent points. Now we're getting much lower here. No doc strings, SQL, welcome back.

Okay, fair enough, fair enough. Now we're onto smaller stuff. All right, so a code review was done comprehensively.

What's left to do? Well, let's look back in Encloed Code. Let's just quickly do a slash context to see how we're looking.

How much is the context full? We've got two lines full of the conversation. So far, fair enough.

We've got room, we can do something, we can do plenty. What we're gonna do is say, okay, thank you. Please go ahead and address all the, what do we get to say, all the high and all the medium, all the, let's look at this executive summary one more time and see that the, let's address all the critical, high and medium priority, critical, high, and medium priority issues and let me know and retest, retest everything and let me know when everything is remediated and tests okay.

All right, there we go. We've had it do a code review on my saying, all right, you've identified these things. Now go fix them.

Well, honestly, that ran pretty fast in about five minutes, and it did follow everything nicely, and it says that all alt-tests have passed successfully, and I just brought it up, and sure enough, it's working fine. So that was nice, but one thing to look for, you always have to read particularly the summaries and just watch as things happen. I saw this happening while it happened.

It decided to defer this idea of restructuring the monolithic file. It just felt like the cost benefit wasn't there given the amount of change it would evolve, which is super interesting, you know, 'cause it's not a bad decision. And it shows that it doesn't just blindly follow instructions.

It decided to disobey me and it didn't fix all of the hyper-arity things. But I really wanted that. And so this is where I come back and say, this is good, is good.

But actually, it's main.py, right? Main.py and organize into modules and packages as appropriate. Check and test everything.

This is going to be an important step. We will see how it does. Let's leave that running.

I'll see you in a sec. Okay, and it's just finished. And it again took five minutes or so.

### Putting it together

And it has restructured the monolithic main.py file. It's just restructured it into a lightweight main file. Let's go and take a look at that in a second.

With config, models, database, AI dependencies, and then routes with a separate module for each of the routes. That's a great, very decent structure. It's run all of the tests.

They've all passed. I saw it doing it. You see it running through as it runs these things and as it makes the changes here and there you see the pass all 23 backend tests pass and then it runs the front end test, all of those passed.

It also I noted updates the documentation without needing to be prompted to update it, which is great. And then this is the summary of all the test passing, a summary of the fixed, and that all of the criticals are fixed, all the highs are fixed, most of the mediums are fixed, and it's updated the docs. And I did open a separate terminal, and I opened it up, and I just ran it, and it ran successfully, I asked it to describe the project, and it described the project.

Everything is working nicely. If we have a look at the code itself, move this down a bit. We should see this is the new main dot.

That's a perfectly good sized module. You remember how before the smaller preview here was absolutely monstrous. Now it's perfectly decent.

And there's some pretty nice looking classes here that organize things. This is the AI layer that organizes the AI call. Very nice, nicely done.

The database models, this is a good code structure. Cloud Code has done a comprehensive code review with one little mistake of a false positive, and then it has fixed up everything nicely, and everything is tested successfully. Good job, Cloud Code.

What do I have left to do? I, of course, at this point, have to go, I can stay in this here, I'll stop my server, control C to stop the server, do a git status, to see all the files that got changed, lots of things got changed, changed the Docker file 'cause I added in a health check in there I notice, which is great, git add dots to bring everything in, git commit minus m, get commit -m, "glored code code review fixes." And there we have it. We've checked everything in all those changes have now been committed and I think that's a job well done.

And I will flip back to "glored code" running here and I will just do /context so we can see how much of the context that we use up with all of that. Well, look at that. All of that work that we did refactoring and rebuilding everything has filled up all of the context.

And so it would be about to do a compact itself. As it comes into this buffer territory, it will decide at some point, you know what, I need to compact. But we can force that ourselves by doing slash compact, which will right now clear the conversation history, but keep a summary in context.

Optionally, you can do slash compact and then write some instructions to tell how to compact. But we're just going to do this. This is now going to kick off a manual compact.

I do recommend that you try and do this manually. You don't what you don't want to happen is for it to be right in the middle of some big activity and then to suddenly go into compact be right in the middle of some big activity and then to suddenly go into compacting, right in the middle when it's trying to do something like rewriting all of your code or something like that. So it's always best to kick off a big task when you've got plenty of room in your context and then do a slash compact at the end of it.

And this will take a couple of minutes to go through and compact and I'll see you when it's done. Okay, and the compact finish. Let's do slash context.

To have a look at what we've got now, here is the context, very nice, lots of clean, empty space there. You get a sense of relief when you do this, and everything has been compressed down to this space here. And of course, the thing that's always on one's mind is what have you lost by doing that?

And often when you do this and you compact, you find that things are faster and better and sharper afterwards except you've lost some of the information about what was discussed. And so some mistakes get repeated. Maybe again, it's going to think that the.env file is checked into Git or something like that.

And so that's why it's always worth having the human eye on this process update clawed.md. So it has some crucial information or tell it to. Make sure that you've got the information you need always in context.

And as a very final thing to do, I'm going to do slash status. I just want to show you this. You press slash status, you get this little status panel.

You can use the left and the right arrows to flip between three pages, status, config and usage. The status is telling me what version I'm on, the session ID is giving me that my login method is that I have a claud of max account and that my model is opus 4.5, the most powerful model there is.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

Okay, and now you click over here and to go back to "claud" running. What I want to do now is have it look at a few things. First of all, I notice the red over here is saying that there's some linting problem with page.test.tsx.

## Practical tips

- It looks like the LLM is blaming one of its exploration agents or one of its sub-agents. It's like, don't blame the agent. You should have checked.
- If we'd use uv, then this would have all been fine, but it decided not to use uv, so we don't have a lot version. If we'd use UV, then this would have all been fine, but it decided not to use UV, so we don't have a lot file. And this is a perfectly decent thing.
- Well, honestly, that ran pretty fast in about five minutes, and it did follow everything nicely, and it says that all alt-tests have passed successfully, and I just brought it up, and sure enough, it's working fine. So that was nice, but one thing to look for, you always have to read particularly the summaries and just watch as things happen. I saw this happening while it happened.
- This is going to be an important step. We will see how it does. Let's leave that running.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

If I go over to config, you can see more about the different settings that I've got and then over to usage. You can see that I've used 7% of my daily allowance that is going to reset quite soon and I've used 2% of my weekly allowance and zero of my current week for sonnet, which is a lower end model and this is because I had the max plan that means I have a lot of ability to do lots of things. So that gives you a good sense to slash status to see that report depending on the plan you may have used a lot more than me, but we will cover more about that kind of thing later. I hope you've enjoyed your first deeper experience with Claude Code.
`;export{e as default};