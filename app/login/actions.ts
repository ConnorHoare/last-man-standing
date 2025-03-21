'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

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

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const username = formData.get('username') as string
  
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password })

  if (signUpError) {
    console.error('Sign-up Error:', signUpError)
    redirect('/error')
    return
  }

  const user = signUpData?.user
  if (!user) {
    console.error('No user returned from signUp')
    redirect('/error')
    return
  }

  const { error: insertError } = await supabase
    .from('users')
    .insert([
      {
        id: user.id, 
        email: user.email,    
        username: username,   
        role: 'player',     
      },
    ])

  if (insertError) {
    console.error('Insert Error:', insertError)
    redirect('/error')
    return
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

