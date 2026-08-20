var e=`# Tutorials, Code Reviews with Opus, and Cross-Model Collaboration

> Week 1 · Day 4

## Overview

Okay, so I gave that feedback to the model. I told it to work on the prompts.

I told it to work on the chat user interface to make it tighter and to stop the scrolling thing. And it did all of that.

It got a bit stuck with the chat user interface. It made some changes and the colors were all wrong.

## You will learn

- Understand the main ideas covered in **Tutorials, Code Reviews with Opus, and Cross-Model Collaboration**
- Follow the practical walkthrough from Week 1, Day 4
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

And I told it to fix it and it tried and it made no difference. And we went backwards and forwards about four or five times. And this is the kind of thing that can get very frustrating.

And you can start finding yourself getting more and more annoyed. But instead what I did is I said, okay, I tell you what, don't do it that way. Build a completely different chat user interface.

Just remove what you did, try again. It did it another time and it looks great. So that's a good technique to know about.

It's, it's, there comes a point when you get sort of stuck in a rut. You're asking the model to make a change and it's making the same mistake or it's just stuck and there's a point when you can just say let's approach it differently. That might be easier than trying to figure out what's going wrong.

So that's what we did. Anyways with that let's now bring it up. So I'm going to come here and do mpm run dev to bring it up.

Let me show you what it's come up with. This is what it looks like now. Okay so I'm going to go to a local host 3000.

Here is our website and doesn't it look beautiful? Scroll down, let's find our way to the digital twin. Here it is and I'm going to say hi there.

And you could see first of all that it's nice, the formatting is good, it looks polished, it has this thing where it sort of does a dot for a while and then it's thinking it's just running on my local computer which is doing a lot so it's not particularly fast but here it comes and it streams back very nicely like that. Hello I'm Ed Donner. What are you most proud of and let it have a think about that it's going to have more to say so it may take a bit longer but but I do think I think that the formatting is really excellent now which is which is very nice it's got the same it's it fixed the problem with the scrolling as I said and it also has the whole of the prompt in there the whole of my LinkedIn profile in its prompt so it's giving better more rigorous answers so I think this is a terrific website I think that this chat interface now looks great everything is really good there's plenty of room for improvement but for just just a few minutes of vibe, I think this is a great start.

And now for my master stroke. Everything that we've done so far has been breaking a lot of the rules that I said at the beginning until this point. I am now going to stop the server with ctrl C.

I'm going to come here to my agent and this is the prompt I'm writing. Please now write me a comprehensive tutorial in Markdown that's suitable for a complete beginner in front-end coding to walk me through what you've done here. Include a summary of the technology, a high-level walk-through, a detailed code review with code samples, and end with five suggestions for the ways the code could be improved based on a self-review.

### Deep dive

I've kicked that off. I am basically having it appraise itself and give me this detail. And it's doing that now.

It's building a tutorial and in a moment, we'll take a look at what it's made. Well, that's complete. Let's have a look.

It's here. It's tutorial.md. I'm going to open a preview by right clicking to have a look at the tutorial that's been written for us.

Professional, website and digital twin chat, beginner tutorial. You can see here, there's a summary, there's a walkthrough, there's a code structure, there's samples of the code written here, the styling, the front end, and the backend, and how that works, how to run it locally. It's pretty minimal, but it's a start, and what we can now do is iterate on it again, and say, build this out, give me more, and you can do that and make sure that it's pitched at the right level of detail for you.

And that, and you can do that and make sure that it's pitched at the right level of detail for you. And that's what you should do now. And do that with this so that you get to the point when you really understand.

Take this if you're already familiar with the front end and you're like, oh yeah, I get it. But if you're not familiar, use this as your way to learn about it. It's both a way to learn about it and it's a way to challenge and test your agent to make sure you're satisfied with the way that it's done the work.

And as a final point to mention, one of the cool things about cursor is that because we can just switch between the different models, and I guess this is true for the others as well, we can now have a different model do a code review of what just happened. So I can say please do a comprehensive code review of this project and write the results to review.md including remediate any remedial actions needed. Don't actually change any code.

And we can send this not to codecs, but instead to opus 4.5, the strongest model for an anthropic and press enter. And this whole context, conversation, assignment and work goes to opus now to do a comprehensive code review. And what we're seeing here in the thread is not conversation from codecs anymore, it's now from Opus.

And that means we're getting like a different trained model with a different perspective to give us its view on what's happened. And so I will come back when that code review has been written. Okay, and that completed and we'll find it here in review.md and we open that up.

And we will find, I mean, I just love Opus and we will find this super comprehensive code review. We should have had Opus write the tutorial. It would have been this comprehensive.

### Putting it together

Lots of stuff in here. This there's one that's perhaps a bit of a mess about the.env file. But other than that, these are things that are lots of good points it makes.

I took a look through it a moment ago and with sort of action plans around it, it does a good dependency analysis. It does lots of useful things here and it has some remedial actions. The critical ones that it's concerned about, the.env that's there.

This is probably a real problem. And then that's not a massively serious one, but probably a good piece of advice. So lots of stuff here that's great.

And of course, what you could now do is go back to codex and say, take a read through this document and implement the remedial actions or say if you disagree. And that's a way that you can just call these different LLMs to have them each work on a piece of the puzzle together. And in later weeks, when we work with subagents, with multiple agents, we will of course be able to do that sort of in real time collaborating.

But this is foreshadowing that functionality to come. So this is a really great exercise using our models to write a tutorial and you should keep drilling down until you've got the detail you need to understand this and doing a code review and then remediating the code review. That is a great way to get good quality out of vibing on YOLO.

And with that, hopefully you have your own website and digital twin built and working. If it's not, remember be patient, simplify, simplify, simplify. Take it back to a simple website, make sure the website works, and then add bits in.

Particularly if you're working with smaller models, that is often required, but you should get there, you should have it working. And if you absolutely love it and you're thinking, I wish this were my website, well, you could take my AI engineer MLOps course to find out about deploying things into production. Or for this simple one, you could just ask your model to build you a tutorial for how to deploy it to something like Vercel yourself and it will tell you how to do it.

It would actually deploy it for you too, but I recommend just get it to write you the to-do list and then go and do that. Should you wish this to become your website? Because hopefully you'll have something really beautiful.

And I do hope you enjoyed it. Our first real YOLO, we broke all of the rules, but we didn't break them totally because at the end we came back and looked in at the code and checked it. Okay, with that you are 27% of the way through.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

And I told it to fix it and it tried and it made no difference. And we went backwards and forwards about four or five times. And this is the kind of thing that can get very frustrating.

## Practical tips

- And you can start finding yourself getting more and more annoyed. But instead what I did is I said, okay, I tell you what, don't do it that way. Build a completely different chat user interface.
- Professional, website and digital twin chat, beginner tutorial. You can see here, there's a summary, there's a walkthrough, there's a code structure, there's samples of the code written here, the styling, the front end, and the backend, and how that works, how to run it locally. It's pretty minimal, but it's a start, and what we can now do is iterate on it again, and say, build this out, give me more, and you can do that and make sure that it's pitched at the right level of detail for you.
- And that, and you can do that and make sure that it's pitched at the right level of detail for you. And that's what you should do now. And do that with this so that you get to the point when you really understand.
- Take this if you're already familiar with the front end and you're like, oh yeah, I get it. But if you're not familiar, use this as your way to learn about it. It's both a way to learn about it and it's a way to challenge and test your agent to make sure you're satisfied with the way that it's done the work.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

And that was a great blue day. The first blue day. Tomorrow is another blue day as we build more projects. I'll see you then.
`;export{e as default};