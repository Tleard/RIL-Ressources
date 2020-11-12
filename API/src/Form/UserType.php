<?php

namespace App\Form;

use App\Entity\User;
use FOS\RestBundle\Validator\Constraints\Regex;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Unique;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('username', TextType::class, [
                'required' => true,
                'constraints' => new Unique()
            ])
            ->add('first_name', TextType::class, [
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                    new Regex('/^[a-zA-Z]*$/')
                ]
            ])
            ->add('last_name', TextType::class, [
                'required' => true,
                'constraints' => [
                    new Regex('/^[a-zA-Z]*$/')
                ]
            ])
            ->add('password', PasswordType::class, [
                'required' => true,
                'constraints' => [
                    New NotBlank(),
                    New Regex('/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{7,}/')
                ]
            ])
            ->add('retyped_password', PasswordType::class, [
                'required' => true,
                'constraints' => [
                    New NotBlank(),
                    New Regex('/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{7,}/')
                ]
            ])
            ->add('email', EmailType::class, [
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                    new Email()
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
