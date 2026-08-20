var e=`# Building a Kanban App with GitHub Copilot, Docker & FastAPI

> Week 1 · Day 5

## Overview

Okay, so it's saying that it's done that part and everything is good. I just want it to ask it to explain itself about this requirements.text.

Can you explain why you needed a requirements.text? I thought we were using UV.

Okay, let's see what it says. UV still needs an input and use requirements.

## You will learn

- Understand the main ideas covered in **Building a Kanban App with GitHub Copilot, Docker & FastAPI**
- Follow the practical walkthrough from Week 1, Day 5
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

Okay, that's fine. That's fine. So I did.

I, if you know about UV, it didn't set up a UV project, which is what I would have done. It used requirements.txt, but it was still using UV. It claims at least, maybe I should check that.

But I think that sounds fine. If we look here, we should see the Dockerfile. This Dockerfile is the, this is where you describe the Docker image.

If you remember when I, when I explained how Docker works, and you can look through this to see that it's using Python 312, which is always a sensible idea for this kind of stuff. It's, yep, it's brought in the requirements.txt. And yes, it has indeed done.

That's not the best way of doing it for people that know UV but it doesn't matter that's fine. It works for this purpose. I'm happy with that.

Okay, good. Now maybe I can ask it please. Please tell me how I test this part myself.

Okay, so we'll get it to explain to us how we can check that part two is working. 'Cause we want to trust but verify at each step. Okay, so it's saying first of all that we should bring up a terminal.

Here's a terminal. Right here, I can press the plus button to have a terminal. And I should go to run scripts start Mac.sh.

So I'm gonna do scripts start Mac dot sh and it says permission denied because I need to hang on. No, I'm just going to I'm just going to I know what to do but I rather than do anything I'm just going to show this allow. So if you have a problem like that, you just tell it the problem and it should fix it.

And now it's telling me to do that again. So now I'm going to do, sorry, I'm going to go over to my terminal. Just here is where you flip between the different terminals you have open.

I'm going to run scripts slash start Mac dot SH. That's the script that should be starting this. Up it goes.

It has, it has started. And now it's telling me that I should go to local host colon 8000 to see this. And that's what we'll do.

Okay. So I'm I should go to localhost colon 8000 to see this and that's what we'll do. Okay, so I'm going to go to localhost colon 8000.

Sorry, localhost 8000 slash and here we go. Try slash health and status is okay and try slash API slash hello. Hello from fast API.

Everything is working. Thank you. Thank you to our GitHub co pilot, part two is working.

Okay, and that's telling us that we can run the stop script. I know as well, I can just do control C and c and that will work perfectly well too. Okay, that's good.

Part two is done. Done. Are all the success criteria for part two achieved.

Let's see what it says. Not fully. We verified something.

### Deep dive

We did not measure 80% coverage. Let me see. Or valid scripts on PC or Linux.

Well, I'm not going to be using PC or Linux for this. So I'm good to skip that the PC Linux. And I can confirm I've tested all the roots.

Let's mark that complete and proceed with part three. On it goes. So let's go and have a look and have a look at, remind ourselves what part three is all about, but I imagine this is going to be an exciting moment for us when we actually get to see a proper front end.

Let's go into the docs. Let's go into plan. Let's open preview and see what part three it is indeed adding in a front end, a static front end.

You can notice over here that it's showing us that there are 16 files changed and it shows you the sort of edits, the diffs. And this is where you can see what differences are happening, like what is being changed by the agent and see what's being added, what's being removed and so on. And pressing the keep button means that you're saying, "I agree to those diffs." And there's a school of thought that says that you should look through every single diff individually.

We're not going to do that. I'm just pressing the keep button. We're going to be accepting changes like that unless there's something that we're particularly concerned about, like maybe when we first use the AI aspect.

All right. Anyway, I will see you back in a second when part three is ready for testing. I'm going to stop for a moment while it's in the middle thinking.

It's been going for about 10 minutes to mention something interesting that I'm seeing happening here. I made that perhaps I'll keep allowing things as they go. Maybe perhaps a foolish point of saying that it had to achieve 80% unit test coverage and it's been spending the last like most of the time it wrote the stuff very quickly.

It's been bogged down in testing, building long complicated tests to try and get to make sure that it's covered things but it's not doing it in an intelligent way. It's not testing things that really matter. It's adding in tests just for the sake of it.

There are testing things in a way that are not considered helpful way to test things just in order to achieve the objective. And this is a great example of a trap that you can fall into with LLM's that they're so eager to follow the letter of the rules that they don't push back and say, "You know what, I know you wanted 80% test coverage, but we're not making productive use of time." So that's something to note. Now it says everything is done, it's done lots and lots of testing.

It's been spending most of the time testing, it's done both front and and back end tests, so we should now be in really good shape. It's time for us to try out part three. Okay, so with part three completed, we're going to give it a test.

I'm going to do the start Mac script. You should be doing start PC script. Up it comes.

The server has come up. It's running. So now I should bring up my browser and go to localhost, localhost colon 8000.

And we are hoping to see a canamban. We do see a camban. Here we have it.

This is the camban. The front end is being served. It looks great.

We should be able to move that over there. Yes, we can. We have a camban front end view, looking very fancy indeed.

The good old codecs one that we liked so much, camban studio. All right. I'd say that that's success.

It's time to move forwards. I'm going to say approved. Move to part four.

### Putting it together

By the way, going forwards. Please update the plan to only If it's sensible to do so, avoid adding unnecessary tests just to hit 80%. Focus on useful, on valuable tests, not hitting 80% is okay.

All right, let's give it that direction. That's a good re-steer that maybe will help us out later on. But now it's moving on.

It's going to step four. I will see you in a minute when we have that done. And while it's running, I'll just mention again, looking here at these diffs, you see the green of the new lines it's adding.

The red is where it took something out because it replaced it with that. You can press keep and undo on each of these diffs manually or I can just come here and press keep here and everything is accepted. And you know, as Andre would say, watch it like a hawk, but I think you probably don't need to review all of the diffs at this point, just the sensitive ones that that you really care about.

And I'm going to definitely allow for that. I'll see you in a minute. Okay, it says that part four is complete.

We'll be the judges of that. We'll come back over here. Where are we exactly?

We are just in the PM directory. So I'm going to start scripts slash start_mac. Oops, sorry, we're on my start-mac.

Dotsh, let's give this a whirl and now we will take a look and see what we have running. Up we come, we're going to reload this page. Oh, it's still starting up.

Sorry. There we go. For a moment, I was, I was concerned.

So welcome back. Sign in to continue your cambam board. Use the demo credentials.

Sign in with the user and pass word. Oops, spell it right though. There we go, sign in and in we come.

(laughs) Yeah, so Google of course does not like that. I'm not gonna add that to LastPass. Up comes my Camben Studio and there's a logout button up there.

And for us that I come back to here. That's nice, this seems to be working just fine. I like that a lot.

In we have this here, okay, that's gonna be annoying, isn't it? Very good, okay. I'm happy with that.

And now log out and log in. And here we go. And did you see that?

Look at that. This is maintained. That is good to see excellent okay alright and I'm going to do ctrl c to stop that server running now something I'm going to do now that I said I was going to do every step and I did end so you did do you notice did you stop me something that I said I would do is be taking git snapshots as we go which we should be doing but you know the first four parts have been pretty innocuous we We could always do them again and then they were low risk, but now we're going to get to databases coming up.

It's a little bit more serious, so it's a good point. So if you don't know the basic git commands to do this kind of thing, then please do do or there's some git resources that I've got, but also you could just ask the agent or ask chat GPT just to give you the basics. But essentially I can type git status to give you the basics, but essentially I can type get status to see all of the things that have changed, a lot of things have changed.

I can do git add dot to stage them all for commit. I can do git commit minus m part four complete.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

Okay, that's fine. That's fine. So I did.

## Practical tips

- If you remember when I, when I explained how Docker works, and you can look through this to see that it's using Python 312, which is always a sensible idea for this kind of stuff. It's, yep, it's brought in the requirements.txt. And yes, it has indeed done.
- That's not the best way of doing it for people that know UV but it doesn't matter that's fine. It works for this purpose. I'm happy with that.
- It's been bogged down in testing, building long complicated tests to try and get to make sure that it's covered things but it's not doing it in an intelligent way. It's not testing things that really matter. It's adding in tests just for the sake of it.
- There are testing things in a way that are not considered helpful way to test things just in order to achieve the objective. And this is a great example of a trap that you can fall into with LLM's that they're so eager to follow the letter of the rules that they don't push back and say, "You know what, I know you wanted 80% test coverage, but we're not making productive use of time." So that's something to note. Now it says everything is done, it's done lots and lots of testing.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

And that is now all put committed to the repo, just to my local repo. I haven't pushed it to GitHub, but I've committed it locally in a way that I could then come back to this point if I need to. That's a good practice. Okay, on to part five.
`;export{e as default};