# Claude Code Checkpoints, Rewind, and YOLO Mode Explained

> Week 2 · Day 2

## Overview

Okay, but we're not going to go back snarky-glored. We're going to go to normal old boring stuffy-glored.

You can feel free to keep going with snarky-glored if that's what you wish. Okay, and now we're just going to do some proper stuff so I can show you within this particular session how we can rewind.

So what should we, we'll start with please summarize the project. And then I will, I will go ahead and ask a bunch of stuff.

## You will learn

- Understand the main ideas covered in **Claude Code Checkpoints, Rewind, and YOLO Mode Explained**
- Follow the practical walkthrough from Week 2, Day 2
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

I'll ask it to do a code review again and to draw an architect's diagram and I will see you back in a minute. Actually, I'm gonna do it while you watch 'cause I'm gonna show another shortcut key. Okay, so I'm gonna say please do a code review and write results to review.md to review.md in the docs directory.

And we'll leave that running. And while we do it, I'm going to press control O, which is the way to see the detail. Look at that and control E is to show all, and E again to collapse.

So we can see everything that's going on in this thinking trace here. And this is if you want all the gory detail of what's happening in the agent's mind, as it's thinking this through. You can also see the control B is a way that you could have this go off and run in the background.

What do you keep going with more commands? But here we go. We can see it doing its thing, exploring the code base.

it's thing exploring the code base. You can see the model on the bottom right. Okay, and I'm now going to leave this running while you should do it too, and watch that trace uses the way of getting a little bit of insight into how the model runs, and I will see you back in a second.

Okay, and it's made all of those changes, and it's showing it up here in the screen, and I'm going to say yes, allow all edits during the session, pressing number two. So that's been accepted and that has happened. And it's now just writing some more.

But again, I want to show you if I press control O, I can go through this and you'll see tons and tons of information here about everything that it worked on and come back down here again to the bottom and control O to sort of release that. So yeah, that has done its thing and written a long code review. And I do believe, I think I saw when I was looking through the transcript, that it's made the same mistake again, yeah, of the exposed API key.

### Deep dive

I suppose it's the same, it's using the same sub-agent that's making the same mistake. So once more, it has failed with that. Let's just try, since we're going to do some checkpoints, and let's just try saying, "Are you sure that the API key is exposed?" It's not tell it that's in Get Ignore, let's see if it can work that one out for itself.

Give it a moment to think about that, and yeah, then I will see you back, and we'll then try looking back, the rewind going back through the check point. Okay, and just based on that simple challenge, it did indeed spot that it was wrong that there wasn't a key exposed. It corrects itself and updated all of the files.

And again, you get this up, but here, control O and you get to see all of its thinking and what it's doing and how it's making its changes. So control O is worth doing if you want to really dig into the detail there. Okay, at this point, we're now going to just look at the checkpoints to see how that works.

So, first of all, if we look at the review, we can see that the review does not have the critical issue of the.env file, the wrong critical issue. Let's now try and see if we can rewind one step to before I gave it that hint. So, I'm going to slash rewind and you just type rewind and press enter.

And now you can see, we go down, it's similar to the sessions resuming. You can see how we can go back to these different sections of, and I'm pressing the current is where the arrow is set right now. If I press the up button, we go up to are you sure that the API key is exposed?

And that would take us back to before I sent that. And then before that is please do a code review. And before that is please summarize the project.

So let's press there. And now we can choose, do we want to restore both the conversation, the chat we were having to that point, but also the code as well, because will track back or undo that change the markdown or just the conversation or just the code or never mind forget it. Let's do both, let's go back in time, back we've got and now you can see that it's put my message on the prompt there, but if I come back here to review.md, we can see that there is now again that high security key, the code has been reverted.

### Putting it together

So both the context of conversation with the model and also it's the code, the state of the code has been reverted back to that checkpoint. So that hopefully has given you some clarity on the difference between checkpoints and rewinding the checkpoint in the current, in the session that you're in versus saving a whole session and resuming Claude from a previous session, which is a sort of bigger deal and doesn't involve changing the code. It's just about go back to that state of the context.

Those are the two concepts that we've worked through. And next up, we're going to have some fun. So look, I mentioned earlier when we were doing Shift Tab and we were saying automatically accept edits.

I sort of coily called that YOLO. And it's not YOLO at all. It's just about saying that will automatically approve diffs rather than stopping at each one of the diffs.

YOLO is a bigger deal, as you know, from the times we've done it before. And you can do YOLO with Claude Code and it's where YOLO began, I think, is what caused the whole movement. And that's what we're going to do next.

We're going to do YOLO and then we're going to do YOLO on steroids and that will then, that will be the end of our living dangerously for today. Okay, but before we do that, we're going to just check everything in. We're going to do a git add dot.

I think we're going to just go to a couple of changes to files. I also, I deleted the code review. So there's nothing like that in the git commit minus m before yolo, before yoko before yolo.

There we go.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

I'll ask it to do a code review again and to draw an architect's diagram and I will see you back in a minute. Actually, I'm gonna do it while you watch 'cause I'm gonna show another shortcut key. Okay, so I'm gonna say please do a code review and write results to review.md to review.md in the docs directory.

## Practical tips

- So let's press there. And now we can choose, do we want to restore both the conversation, the chat we were having to that point, but also the code as well, because will track back or undo that change the markdown or just the conversation or just the code or never mind forget it. Let's do both, let's go back in time, back we've got and now you can see that it's put my message on the prompt there, but if I come back here to review.md, we can see that there is now again that high security key, the code has been reverted.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

Done. All right. Clear the screen. It's time for me to show you the trick of the day.
