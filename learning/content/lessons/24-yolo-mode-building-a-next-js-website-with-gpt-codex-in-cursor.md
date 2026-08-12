# YOLO Mode Building a Next.js Website with GPT Codex in Cursor

> Week 1 · Day 4

## Overview

Okay, so I'm here in cursor and it's ready for a YOLO time. You don't need to be in cursor, you can be in whichever one of the IDE's that you liked.

But if you want to stick with me, then stay in cursor, we'll do this together. And I've gone to file and gone to new window, and I'm going to press open project, and I'm going to go into my projects, and I'm going to create a new folder.

I'm calling it site, S-I-T-E, for website. I go into it.

## You will learn

- Understand the main ideas covered in **YOLO Mode Building a Next.js Website with GPT Codex in Cursor**
- Follow the practical walkthrough from Week 1, Day 4
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

Here we are inside site. I press open and now we're in project site. You know it because site is in block capitals there.

We are ready to build this. Okay, next up, I'm going to do something very carefully and you are too going to be very careful here here in site going to right click and say new file and I'm going to call this file exactly dot the dot and then env dot env. And it needs to be called exactly that or things won't work for you.

So it has to be right. And what you put in here has to be also exactly correct. Open router one word open router underscore API underscore key equals and then something to be pasted in here.

What do we paste in here? What we paste in here is something that we take from here, that the API key that we've got right here, in OpenRooter. You remember this, you copied it to the clipboard before, if in down creating new key and copy it to the clipboard, so you've definitely got a key copied to your clipboard.

And then you come back here and you do paste and the key appears there. And now you have an open router API key that is in here. And this white blob up here means that this file hasn't yet been saved.

So this isn't yet stored to disk. I'm going to save it with command S on a Mac, control S on a PC or file save, and then the blob goes away. And this is now saved.

It's spelled open router_api_key equals and then the key is in there. If you're using an open AI key, direct, it's open AI_api key. You have to get this right, otherwise it won't work.

So very important to get this right. Okay, next up, right click here, new file, we're gonna create another file. So I'm gonna do that in, right click new file, we're going to create another file.

So I'm going to do that in right click new file and then I'm going to do dot git ignore all one word like that dot git ignore. And this is where you list the names of files that should never get put into git. And we're going to list one file and it's the file that is called dot emv.

And I now save that. And this just means even though this isn't actually we haven't made a Git repository for this if we ever do in the future it will make sure that this file is never added to the repository Which is always good best practice good thing to do make sure that your dot emv file is mentioned in your dot Git ignore Okay, that's just some some setup. We've got our key here.

Let's move forward. All right, next up, I have gone to my LinkedIn page. Here it is.

This is my LinkedIn page and I am now going to go here to resources and go to Save to PDFs so that I can save my profile, this is on my profile page as a PDF. Now, this feature might not be available to everyone because LinkedIn is funny and changes things from time to time and it might only be available to a subset. If you can't save your PDF of your profile, just copy and paste the text of it into a text file.

Or if you've got a PDF of your resume, your CV, use that instead, whatever you've got. I've done that, I've saved it to PDF and then I'm going to move that file into this project directory as well. Okay, next up, bring up the cursor settings.

You can do it from the menus or you can do a control shift J on a PC, command shift J on a Mac. Up they come. Here we have it.

We're going to start by going to the agents area, a few things to check. For the usage summary, change this if it's on auto to always, and then it tells you at the bottom how much of your plan you've used in terms of the models. Scroll down here and get to the section that is called "Auto Run", which is the YOLO section.

And if that's set to ask every time or to auto run in Sandbox, change it to run everything un-sandbox. Assuming you're comfortable with this, if you're not, of course, keep it on approving it step by step. If in doubt, have it on a mode where you get to agree to everything as you see it.

But today, at least I'm going to be yellowing. So I leave that on run everything. Finally, I'm going to the models tab myself.

I am going to turn on GPT 5.2 codecs high. I want to use the really strong version of codecs. I want to use the really strong version of codecs.

### Deep dive

So that's what I'm choosing. You can pick what you want, pick the one that you like, but that is what I am going with for this myself. It's, as I say, this is more expensive, but it means we should get higher quality.

Okay, those are our decisions. All right, now I'm closing this. I'm gonna drag this across.

So we've got nice and big agent screen over here. I'm gonna change auto, turn that off. I'm going to say I want GPT 5.2 codecs high.

That's what we want. And I'm going to paste in here my instruction. Now, of course, the right approach is to write an agents.md and then to work hard on giving it all of the right information.

But we are on complete YOLO mode, where we're just going to fire off an instruction and let the agent do its thing. Tomorrow we're going to be more disciplined and follow the proper procedures. But for now, we're just going to go for it.

So I'm pasting in here. Please build me a professional website running locally. My LinkedIn profile is in LinkedIn.pdf.

Make the website stunning. Enterprise meets edgy. It should include about me, my career journey, links to a portfolio for future iterates to make it as slick and professional as possible.

And let me know when complete use next JS. That's it. That's the instruction.

That is what we are giving GPT 5.2 codecs. Hi. All right, I kick this off and off goes our agent.

It's planning its moves. So it's going to now start doing its thing. I think we'll see what happens.

It's gonna have problems running that in the route directory. We'll see how it navigates its way through various problems. And yeah, it's created a sub-directory for me called web, which is great, good for it.

We will let it do its thing and I will see you in a few minutes. It may take a while but it may need to go and get another coffee. I will see you when it's wrapped up and we will see what kind of website we have at the end of it.

Okay, so it believes it is finished. It says it's built up, polished, enterprise meets edgy next-day site in web using your LinkedIn content. All right, you ready to try this out?

I'm gonna open up the terminal. You can go to view terminal in cursor. I'm gonna do it with control back tick.

Here it is. I'll give myself a little bit more room. It tells me to CD into web, and it tells me to do MPM run dev.

Is this gonna work? Let's find out. Here we go.

Well, it appears to have come up there. Now I will bring up a browser window. You're getting like real time reaction here.

Local host 3000, let's see what we get. That's not much good. All right, back we go, back this over here.

### Putting it together

That... Hang on. We can just copy all of this like this.

I can just take all of this. I can copy it. I don't even need to give an explanation.

I can just paste that in there and just press enter. We are vibing. We are yoloing.

We're not going to even bother explaining ourselves. We just send it the error and we say, come on, make it work. All right, I'll see you in the next sec.

Well, the next sec literally was a sec. It just sort of finished made a tiny change. You'll notice again, a clear sign.

It didn't prove that was the problem. It hasn't proved it's fixed it. It says the page should render.

Of course, what we should do is have an agent.md that insists do not say you fix something unless you've proven it. But nonetheless, we're just gonna keep going here. I'm just gonna do an MPM run dev again.

Let that thing come up. I'm gonna come over here. I'm gonna try running my website.

Let's see what we get. Okay. Okay.

First impression, positive. I like this. I like it a lot.

I like the way it looks. I like this branding. I didn't tell it anything about the colors or anything, but I gotta tell you, I think it does look quite enterprise meets edgy.

All right, let's take a look at this. I'm making it fill up all of here. Let me make this nice and big, so you see it the way I see it.

Very nice. Okay, so we've got like this nice little title here, which looks very nicely done. There's about me.

This is a nice summary for my LinkedIn profile. There we go. Career journey.

It's all, oh look, it gets darker. That's kind of cool. Portfolio coming soon.

And there's stuff in here. Let's build a future book or conversation. Connect on LinkedIn.

I wonder where these things go. That just sends an email to me. It's got my real email address in there from my LinkedIn profile.

And this is just a link to my LinkedIn. So first, at first blush, this is pretty impressive. It's a nice functioning website being served on local host.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

Here we are inside site. I press open and now we're in project site. You know it because site is in block capitals there.

## Practical tips

- What do we paste in here? What we paste in here is something that we take from here, that the API key that we've got right here, in OpenRooter. You remember this, you copied it to the clipboard before, if in down creating new key and copy it to the clipboard, so you've definitely got a key copied to your clipboard.
- So very important to get this right. Okay, next up, right click here, new file, we're gonna create another file. So I'm gonna do that in, right click new file, we're going to create another file.
- So I'm going to do that in right click new file and then I'm going to do dot git ignore all one word like that dot git ignore. And this is where you list the names of files that should never get put into git. And we're going to list one file and it's the file that is called dot emv.
- And I now save that. And this just means even though this isn't actually we haven't made a Git repository for this if we ever do in the future it will make sure that this file is never added to the repository Which is always good best practice good thing to do make sure that your dot emv file is mentioned in your dot Git ignore Okay, that's just some some setup. We've got our key here.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

We'll try out some more things. All right, let's check what these things do, what happens if I press career. Oh, it comes all the way down to my career journey in this nice dark black that's nice portfolio we takes you to the to the portfolio okay got it portfolio hub what is that that just takes me over to my personal webpage how about that that's clever of it that links to my uh to my own website there it comes up on a separate page nice very nice let's talk i can see that's going to open my email program and email to my email address that is on my LinkedIn profile So grab that it's really nice Signature work Current focus I'd say this is a great website. The only thing it's missing is some functionality Let's give it some functionality
