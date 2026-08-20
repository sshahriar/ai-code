var e=`# OpenAI Codex VS Code Extension Zero-Shot Kanban App Build

> Week 1 · Day 3

## Overview

Okay, now I don't mean to confuse you, but I have now quit VS code just to start fresh and I brought up cursor again. It looks so similar.

It's like, okay, all right, there's still the sidebar on the right. This is instant.

I'm back in instant again. Because look, what I want to do is I'm in the project subdirectory.

## You will learn

- Understand the main ideas covered in **OpenAI Codex VS Code Extension Zero-Shot Kanban App Build**
- Follow the practical walkthrough from Week 1, Day 3
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

So if you were, when you open up instant, you're inside instant. I've gone CD dot dot and I'm back up in the projects subdirectory. If I do Pwd, you can see I'm in my projects directory.

There's now a new folder called canban that has everything that GitHub co-pilot just built. I'm going to change that name. I'm going to do mv move, which is like rename canban, and I'm going to change it to being like co-pilots, co-pilots, copilots, underscore camban or whatever you want.

But just to keep a record of it, but that's now removed camban altogether. Because now we're going to go in and do this all over again. And so do you remember the next command I'm going to run?

It's going to be git clone. And then that you could take from the course resources or from my my GitHub, can I not get I run that? And we've now got ourselves a fresh cambban folder again just with the one file which is our agents.md.

Okay, it is time for the next on our list, OpenAI's codex. And here we are on the codex webpage from OpenAI telling us all about codex. And you'll see that codex is first and foremost one of these CLI kinds of tools, like Cloud Code, and next week is when we're going to be getting deep into CLI tools.

And it even tells you how to get started with like a CLI command, and it shows you screenshots of it looking like one of these kinds of interfaces that we will get to in time. But it turns out that there is another way that you can use Kodak's, which is again as another VS code extension codecs as a VS code extension too. And for this week since we're all about using the IDE that's how we'll do it.

So I'm going to see you back over in VS code. Can you launch that again please I'll see you there. So after you launch VS code you should see a screen maybe a welcome screen maybe a screen like this whatever it is you should be able to press control shift X + X on a PC or Cmd + Shift + X on a Mac.

It's also going to be the View menu and then it is extensions. And up comes the extensions like this. And right now, it's still got GitHub co-pilot selected because that's the last search I did.

I'm going to delete that and you never guess what I'm going to search for. I'm going to search for codecs. And there it is.

Right up at the top here, of course, I'm already installed because I've used it, codecs, opening eyes, coding, assistant, it's from opening eye with that tick to show you that it's the real deal, and it's had for me three and a bit million downloads for you, probably a lot more. This is it, this is codecs, you should press install, mine's already installed, so I don't have that. Once you've done done that you will have codex on your system Okay, and it's possible you might need to to quit vs code and bring it back up again But once you have the way that you'll know that you have codex installed in vs code Is because you'll have this little symbol over here a little codex symbol what a treat you press that and up comes a sidebar It's on the left side rather than the right side.

So so you know something's different and here we are in codex. So are you ready? The first thing I'm going to do is I'm going to go to the file new window box and I need to re I'm going to do open and I'm going to go into projects and I'm going to open canban, click into it and press open and here it is with the single agents.md file and I'm going to make this bigger and confusingly, ah, you see what's going on here?

Confusingly we have co-pilot over here on the right, x out of that. We don't want that. Go away co-pilot, we're done with you.

You're dead to us. We've moved on. We're on to codex.

We can now press the codex button over here to open up the codex screen right here and get to it. And I'm going to make it a bit bigger with command plus. There we go.

### Deep dive

And also I'm going to drag this to the right. So we have a little bit more space. And I need to mention that you can go to that you need to go to the settings right here.

And this is where you would log in with your OpenAI account. And now codecs is, I believe as far as I know, only a paid model approach. Actually before I say that, maybe I should just click here to see.

You could take a look at this and see whether if you don't have a chat GPT account, whether you're able to choose any other models, but I do believe that you need to have an open AI account, at least you do as of now, like a subscription plan, a chat GPT plan, not an open AI account. And so that's what you would need to do. And you can, of course, skip this one.

It's going to be so much the same as all the others. I just want to show you the tooling. It's not important that you have accounts for all these different platforms if you don't wish to.

But I do and that is the one that we are going to use right now. So we can see we've got some drop downs here. There's agent full access is what I have selected.

Actually, I think it was original and agent and I moved it to Agent Full Access, which is like again the YOLO mode. Then there's choosing the model, so GPT 5.2 codecs for me right now is the strongest, most powerful model that we've got. You probably remember this from looking at my screenshot of artificial analysis, but no doubt by the time that you're doing this, there'll be new models, there'll be more.

So you should use whatever you wish if you're a chat GPT subscriber. And over here is the reasoning effort. This is where you can control how deeply it thinks using that trick that we discussed and making it higher will get you better outcomes, higher quality, but it will take longer.

And it's not always better. Sometimes you find that if you make it think too much, then it can overthink, it can kind of agonize over stuff in a way that feels counterproductive, like it should have just gone for it. So it's not always the case that more thinking needs to better outcomes, it depends a bit on the project and there's a sort of art and science to that, but all things considered, I'm going to have this on high, I think that's the right one for me now.

All right, and with that, there isn't a plan mode, but we've told it that we want it in the inages.md to do its planning first. So I'm just gonna say, please go ahead. It also knows to look for an agents.md.

So it should already understand, look, it's identifying documentation to read, it's readingagents.md, and it's thinking, and it's now going to do its thing. And so I'm going to let it work for a bit and I will see you in a minute. Okay, well that's cool.

It lasted a lot longer than any of the others so far. That was a good 15 minutes that have gone by. I know it was just a second for you, but it was 15 minutes for me and it's been going.

It's been doing tons of stuff. I also noticed down here that you can see the context window usage right here, just as we did with cursor at the beginning. 16% used 42,000 out of 258,000 tokens used.

Okay, and it tells us if we have a look, it's given us a little report here. It says that the Dev server is running, launched by npm run dev. So it's running, it tells me how I can stop it if I wish to.

And it's telling me everything that it's changed including 74 different files. That's a lot of work. Okay, it's time for us to try this out.

### Putting it together

All right, so we're going to go to localhost 3000. And oh wow. Okay, well, it definitely looks cool.

Single board, canban, canban, Studio, it's got a cool name, focus, one board, five columns, zero clutter. Alright, and here we go, here are the different things. So let's see if the functionality works.

And I love what it's got here. Move that over here, and there it goes. Can we rearrange?

Yes, we can rearrange. Can we remove? Yes, we can remove.

Can we rename in progress to wow and look at that it updates there okay okay I got a hand it to it this this is pretty amazing this this is great definitely best so far it looks beautiful it's yeah really nice and yeah we I am impressed. I am. There we go.

There we go. Well, I'm blown away by that. This is, as this is an example, again, and what they call zero char.

This is just, we gave it the instructions. We let it be. This is the outcome.

It didn't even ask any questions. It just built this just like that. And I know what you're thinking.

You're thinking, okay, Ed, but look, you've raced through all of this. You haven't shown us how to write the code, how it works, like how do you build an XJS app to do all of this? So how can I check if it's done a good job?

Well, look, I've got a secret for you here. And just keep this between you and me if that's okay. The secret is, I don't know how to write this kind of front-end code either.

I'm a lousy React developer. I've built some React screens before, but I'm really bad at them. They look horrible as front end developers and we team will tell you.

But this is doable. Even if you don't know how to write front end code, that's the amazing thing. You can act like the manager.

You can give feedback. I mean, I knew that MPM Rondev was how to bring up the server, but you can ask it that as well. And we'll talk tomorrow and throughout the next few weeks about the ways in which you can operate hand in hand with a collaborator like this to get the best out of both.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

So if you were, when you open up instant, you're inside instant. I've gone CD dot dot and I'm back up in the projects subdirectory. If I do Pwd, you can see I'm in my projects directory.

## Practical tips

- But just to keep a record of it, but that's now removed camban altogether. Because now we're going to go in and do this all over again. And so do you remember the next command I'm going to run?
- I'm going to delete that and you never guess what I'm going to search for. I'm going to search for codecs. And there it is.
- Right up at the top here, of course, I'm already installed because I've used it, codecs, opening eyes, coding, assistant, it's from opening eye with that tick to show you that it's the real deal, and it's had for me three and a bit million downloads for you, probably a lot more. This is it, this is codecs, you should press install, mine's already installed, so I don't have that. Once you've done done that you will have codex on your system Okay, and it's possible you might need to to quit vs code and bring it back up again But once you have the way that you'll know that you have codex installed in vs code Is because you'll have this little symbol over here a little codex symbol what a treat you press that and up comes a sidebar It's on the left side rather than the right side.
- Confusingly we have co-pilot over here on the right, x out of that. We don't want that. Go away co-pilot, we're done with you.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

But the bottom line is, amazingly, particularly, actually, with front end stuff, you don't need to have a detailed understanding of the technology to be able to build things like this. Now of course, the devil's in detail and it's fine for a toy project like this, but things get a lot more complicated when you have a much bigger system and when you have much more advanced requirements. And that's why this is still day three of a three week course and we've got lots still to go. But I gotta say this, I think this is really awesome, I hope you like it too.
`;export{e as default};