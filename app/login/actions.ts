'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}



export async function signup(formData: FormData) {
  const supabase = await createClient()

  // Get values from form
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  // If you have a username field:
  const username = formData.get('username') as string

  // Sign up using Supabase Auth
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password })

  if (signUpError) {
    // Could log or display sign-up errors, too
    console.error('Sign-up Error:', signUpError)
    redirect('/error')
    return
  }

  // Grab the user object
  const user = signUpData?.user
  if (!user) {
    console.error('No user returned from signUp')
    redirect('/error')
    return
  }

  // Insert into your custom "users" table
  const { error: insertError } = await supabase
    .from('users')
    .insert([
      {
        // Map to your actual columns
        id: user.id,          // The primary key in your "users" table
        email: user.email,    // Must exist in the table
        username: username,   // Must exist if you want to store a username
        role: 'player',       // If you have a "role" column
        // created_at: new Date().toISOString(), // Omit if your DB has a default
        // password: password, // Only if you truly need it (not recommended)
      },
    ])

  if (insertError) {
    // Log the error to see what's up
    console.error('Insert Error:', insertError)
    redirect('/error')
    return
  }

  // Everything worked
  revalidatePath('/', 'layout')
  redirect('/')
}

