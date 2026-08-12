# OpenCode Use Free Models Like GLM 4.7 as a Claude Code Alternative

> Week 2 · Day 1

## Overview

Okay, and now for something completely different. Let me show you open code, open code.ai.

If you go to open code, this is like an open source competitor to cloud code, which is quite popular, and which is the easiest way for you to use free models. It's, you can free models included, or connect any model from any provider, including cloud, GPT, Gemini and more." And here you have the way to install it.

It looks quite familiar. And this is of course, knowing again that I'm on a Mac, and this is how I'm gonna do it.

## You will learn

- Understand the main ideas covered in **OpenCode Use Free Models Like GLM 4.7 as a Claude Code Alternative**
- Follow the practical walkthrough from Week 2, Day 1
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

And you should have your way to install it for your system. There's also of course, as usual docs here, which has the introductory stuff and the way to install it. And you can install it using Node, using MPM.

Here are the Windows instructions. If you've got a Choco, then that's the easy way to do it, but otherwise MPM of course, 'cause we already installed Node, so that gives you a really easy way of doing it too. But I am going to come and do it on the way that we saw before.

Just the basic way for the Mac. We'll go and do that right now, copy that to the clipboard, and we'll go and do that right now, copy that to the clipboard, and we'll go and do it from VS Code, and we'll experiment with Open Code. So here I am back in VS Code and the welcome screen.

By the way, in Cloud, you could just press Escape to get out of that status screen and then Command Control C to close Cloud Code, and then close down the project, bring up our new window, and now I'm going to bring up a terminal with Control Back Tick, and I'm going to bring up a terminal with control back tick and I'm going to paste in that that curl command or whatever installation command to install open code here it comes make this bit bigger so you can see open code all right it includes free models to start CD to your project and run the command open code to get it started well that sounds that sounds simple, doesn't it? Well, let's begin by going again to File, New Window, and then Open Project, and then go into Projects. And why not?

We'll go back into PM again. Here we are in our favorite project. You may be already have this open.

Make that nice and big. Maybe make it one size bigger for you. There we go.

And here we are in a command line. We probably need to open a new one for it to take those path variable changes we made and now just type open code to launch, open code. Here it comes.

Let us see how it is with open code. So the first thing to notice is that open code is detected that my environment has already signed in to chat GPT to my open AI subscription. And so it's already got GPT 5.2 chat open AI listed here as the model that it's opening under.

It's also worth spotting that I can press tab to switch between plan and build for the two different different agent modes that it's got there, and that I can press control T as it says to flip and extra high in terms of the reasoning level from GPT 5.2, which allows me to be really, really thoughtful, to have a very high level of thought of reasoning going on with the GPT 5.2 model. That was the setting we didn't choose before. We only went as far as high when we were using GitHub Copilot.

Okay, and as with Cloud Code, pressing a slash allows you to run commands. And the commands that I want to show you, the one that we're gonna use, is models, which is where you can switch to a different model. And let's run this and have a look.

And first up, it shows us the different open AI models that are available, which I'm getting because I've got it hooked up to open AI and I could pick GPT 5.2 codecs and then choose the high plan, which is what I would want to do. But I can scroll down here and show you that there are also some free models available here too, and some of these are the open source all stars. KLM 4.7 is from Chinese startup Z.ai or Z and is incredibly powerful and people are very excited about what you could do with this Kimi K2 or Kimi K2.5 is Considered as as of this time the most for me the most powerful open source model on the planet from moonshot AI and from Moonshot AI and Minimax is from Minimax is another really strong model.

### Deep dive

I guess KLM is a really great one. Let's choose that and have our first experience working with a free model and we will put it on plan mode. We will press tab to put it on plan mode and we will now ask it to do a code review as well but maybe first we should remove the code review that's already there, not give it any hints just so it doesn't know.

But of course the code is all, the review is all at the moment all the the high priority stuff is already sorted. But let's just delete that file move to trash, get that out of there. And then we will see how GLM 4.7 fares.

Okay, so we will say please review the entire project. Carry out a code review and write your feedback to code review.md in the docs directory. There we go, off it goes.

Okay, so first of all, you see it's got its own distinct style and look, but there's plenty in common with Cloud Code. It has like a thinking thing here, it's looking at stuff, and it's off and going. And this is running for free.

This is free open source running on GLM 4.7. Let's see how it does. I'll see you back in a second.

Okay, it finished. It prepared its code review. It hasn't actually written the document because it's in plan mode, which means you're forcing it to think before it acts.

So now I can press tab to put it on build mode. And I can say please, please go ahead and write the code reviewed to docs code review dot md but don't start any further work yet. Let's tell it that meanwhile you can see up here while it's going that 34% of the context is filled up.

It's free zero cost, it's working on this. We will see what it does in a moment. And that completed.

We're now 37% of the way through our context window. Code review has indeed been written. Let's have a look.

Executive summary, overall assessment's good. It's good to hear. Strengths, a lot of stuff about a good modular architecture.

Security, hardening needed authentication fair enough. We've got that user ID password thing, which is terrible. That's a good find.

### Putting it together

TypeScript strictness can be improved fair enough. Some code duplication, okay, error handling fair enough. And lots of stuff here.

This looks like a pretty, it's a very long document. It looks very impressive actually. Now generally speaking in these kinds of top models, even though the GILM has got a great reputation for being really, really strong at this, they're still far from using the very frontier.

Now, this does look perfectly impressive, but typically you will find yourself not getting the same kind of independence and ability to sort of act reliably. I very much doubt it could have implemented all of the changes including the refactoring. So easily as we did with Claude Opus 4.5 because it's free.

In terms of the free allowance, this is something which Opa-Gode isn't necessarily completely clear about. It's not like there's a quota, at least not as of now, just that if you start to use it too much, then you would start to slow down or got rate limited, or it might just stop working with an error. And this is something that's liable to change.

So they might not offer these kinds of free models in the future. But you get the models you have access to again by going slash models. And if you want to sign in to a different provider, you do that by going to slash connect, sorry, slash connect, is where you connect to a different provider if you wanted to connect to OpenCodeZen, which I'm already connected to by default, which is their set of free models that we've selected from now to OpenAI that it's already connected to, as I mentioned, 'cause it saw that I had that, and we could connect to Anthropic through Cloud Backs, the subscription plan, or by providing an API key, just as we have for OpenRooter.

We could connect through GitHub Copilot, which I also have all directly to my Google account. So these are the other, and there's masses of others, Azure or Bedrock and so on, if you have any of these. And LMS studio, lots of things to look here.

If you have any accounts with any of these, including OpenRooter, we could select OpenRooter, put in our API key, our open router API key, and use that as a way to connect to open router. Now, the other thing you can do is connect to models running locally on your computer using Alama, say, and those instructions are clearly in the docs and they're pretty easy. The problem is that you need a really big computer for it to be anything that's worthwhile, not my computer's nowhere near big enough.

You need to have at least 64 gigabytes of GPU RAM or a Mac just 64 gigabytes of unified RAM. I would imagine because just running GPT-OSS 20 is not big enough. It would need to be at least running OSS 120.

And there's no way I can run that. And very few people can. If you have that kind of beefy computer and you want to do it, the instructions are crystal clear and you can run a model locally.

But I would suggest that for free models either use the ones that are offered through this through through Open Code directly through the Open Code Zen set of models or use Open Router with your key and just do it that way. That's another great way to run either free or cheap models through Open Code. And so you should definitely experiment with that.

And basically, all of the different things that we're going to be doing in Cloud Code, you can do in Open Code too. And so this is an option that's available for you with more flexibility to switch between different models, more flexibility to be running with multiple models in the session. A lot of people love Open Code.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

And you should have your way to install it for your system. There's also of course, as usual docs here, which has the introductory stuff and the way to install it. And you can install it using Node, using MPM.

## Practical tips

- So now I can press tab to put it on build mode. And I can say please, please go ahead and write the code reviewed to docs code review dot md but don't start any further work yet. Let's tell it that meanwhile you can see up here while it's going that 34% of the context is filled up.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

Personally, Cloud Code is my favorite. I feel like it is the way that everything, the way that the platform is organised around what anthropics, Cloud's models are really effective at, is second to none. And that's why I get the best experience out of Cloud Code, and we will be using that mostly going forwards. But you can always follow along using open code if you wish.
