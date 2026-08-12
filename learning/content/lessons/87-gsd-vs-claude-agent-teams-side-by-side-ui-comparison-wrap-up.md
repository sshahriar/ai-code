# GSD vs Claude Agent Teams Side-by-Side UI Comparison & Wrap-Up

> Week 3 · Day 4

## Overview

Okay, well here we go, we'll bring up a new terminal. We will go, we will just run scripts/start_mac.sh.

Okay, here we go, let's give this a shot. It says it's running, let's go and take a look, let's see if it's actually running.

Bring this up, here's the browser window. Let's see what we get.

## You will learn

- Understand the main ideas covered in **GSD vs Claude Agent Teams Side-by-Side UI Comparison & Wrap-Up**
- Follow the practical walkthrough from Week 3, Day 4
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

Okay, it's working. It's working. The portfolio isn't empty.

But that's because it's remembered the data from the last portfolio. That's something. Wow, I don't...

That's of course because we have that database directory locally. Okay, this looks really cool. What do you think?

I think this is probably a better display. It's got a lot in common. All right, let's, it's amazing that it looks so similar actually.

So how do we add a ticker to, to, to this? Well, let's, let's just buy four Apple share, three Apple shares, press buy. There we go.

Three got onto the list right here and Apple appeared right here. Okay, that's nice. And that's the portfolio and the cash is changing.

Let's try this again. Let's go for for meta and let's get a 10 meta and press buy. I saw the cash come right the way down.

Portfolios come all the way up and meta is now a big part of the portfolio but this isn't actually showing in different colors yet. So the heat map looks a bit inferior, but generally speaking, it is working. We'll give it that.

This is pretty cool. I have to say what just happened to Amazon. I'm not sure.

But in we will come back in a sec and try out the AI assistant. OK, so I'm going to say hi there. And it's thinking hello.

How can I assist you with your portfolio today? I'm going to say I'd like to add, let's see what we add. Let's add IBM to the watch list.

Okay, it's thinking. Still thinking. IBM has been added to watch list and it has IBM is on the Watchlist.

### Deep dive

This is working. Okay, let's now say, okay, I'd like to buy one share of IBM and sell five shares of Meta. Let's see what happens.

Let's see what happens. We want Meta to go down to 5 in our portfolio right here. It's thinking over here.

We're not getting the trademark speed from Suri Brass, but there we go. It did its thing. It executed by and sell, and I see that IBM is up to 1, and Meta is down to 5.

It is working, and I see our portfolio updating down there. And that's pretty cool. So I would say this is really nice.

This chart here is odd. I'm not sure why we're not seeing something there. It's funny that we had the same problem with the other UI as well.

It's meant to be showing Apple, I guess. And this portfolio isn't highlighting in colors. This heat map, the way that the other one did.

But otherwise, I would say this is pretty impressive. The chat is working, this is working really nicely. That just looks terrific.

And generally speaking, it's working. It's, I'm, I'm not sure which one I give the edge, probably the other one actually. I think I give Claude agent's teams a slight one one step ahead of this, but it's pretty impressive.

Let's face it. And I've also, I just dug into the code a bit to see whether it was using our skill to call cerebras. And I've noticed some interesting stuff here and the code that it's got here is that it is using cerebras, but it's not using our code.

It is using light LLM as well. So it seems that it's read our skill, but it's taken in a different direction. It's using a different approach for structured outputs.

It may be, this sometimes happens when it does what we suggest and then hits some sort of a bug and the way that it fixes the bug is to sort of rewrite and do things differently. So I'm speculating that something like that happened. So it still stayed true to sending it to cerebras, but it's also doing some different things to perhaps after encountering a bug.

But generally speaking, I would say this is pretty solid for a first implementation. Even if it had taken a while, I'm pretty happy with the results. And as a final step, we should check into GitHub.

### Putting it together

Let's just see, I know it's been taking commits as we go. So a lot has already been committed. There's just a little bit left to go.

There's some of the most recent stuff with the, oh, that's weird that it's got a no modules, not get ignored from the test directory. We would want to do that. That seems like a bit of a mistake.

And yeah, so I will now check this all into Git, so we've got it nice and tight. And then I will see you for the wrap. Wait a second, I couldn't resist.

Before we have the wrap, I had to bring up the two user interfaces side by side. It's kind of hard because neither of them does well when it's squashed horizontally. But this is the first one we built.

This is the one that took half an hour and used agent teams from Claude. It had this slight janky problem here. It also has this problem that it can't seem to get the prices of things that aren't on the watch list that seems like a bug.

But the UI is really nice and I love the way it does this. And then yeah, I think it looks very professional and it hasn't fallen prey to that problem where these LLMs tend to have purple backgrounds to all of their UIs. The one that took all of the hours, the five hour alternative is this one.

It looks very similar. I think that it's failed on the heat map, isn't colored in in the way that the original one was. And that this isn't quite as dramatic, but it hasn't got the same bug.

It is able to deal with new things that isn't on the watch list, and it's able to handle things better, able to add to the watch list as we saw, and still have prices for things that get added. So from that point of view, maybe it did a little bit better from a quality point of view, but I also, I really like the original one too. So I don't know, it's your call, of course it's your call.

Put it in the chat and you do me, which one you think is better, but for me I'm going with the first one actually. I think that that's despite the defects defects which I think I could tell it to fix them pretty quickly and the fact that it got the whole thing done in in half an hour already speaks volumes to me. But two beautiful products it's super fun to see them side by side and I hope you like that and now I will see you for the wrap.

Well what a day it's been I told you it would be a great day, got a roller coaster. I wasn't, I have to admit, I wasn't expecting how much I was signing up for. For you, it's just been like an hour.

For me, it's been a whole day of toiling with GSD. I understand why people love it. I see that when it's ticking on a really big project, especially if you're willing to run it in YOLO mode and just leave it be, then it's clearly very, very diligent.

I mean, honestly, when I saw it, like I backwards and forwards over confirming and double checking and triple checking that the tests were passing, it was clearly very thorough indeed. I see why it works well, but it's a lot of time spent and a lot of token spent as well. So we really saw those two sides of the spectrum.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

Okay, it's working. It's working. The portfolio isn't empty.

## Practical tips

- But that's because it's remembered the data from the last portfolio. That's something. Wow, I don't...
- It is able to deal with new things that isn't on the watch list, and it's able to handle things better, able to add to the watch list as we saw, and still have prices for things that get added. So from that point of view, maybe it did a little bit better from a quality point of view, but I also, I really like the original one too. So I don't know, it's your call, of course it's your call.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

We saw the new Claude agent teams and how it's able to be very dynamic and then we saw the more regimented, more strict orchestration in GSD and I think we enjoyed two fabulous results as a result of that and yeah I hope you enjoyed that and then tomorrow we should have a fitting finale. I can't wait to show you what I got in store for you. With that, that brings us to 93% of the way along. We've only got 7% left and it's all tomorrow and I can't wait to see them.
