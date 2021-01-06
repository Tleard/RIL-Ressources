<?php


namespace App\Form;


use App\Entity\User;
use phpDocumentor\Reflection\DocBlock\Description;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ResourceType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('type', TextType::class, [
                'required' => true
            ])
            ->add('categories', TextType::class, [
                'required' => true
            ])
            ->add('assets', TextType::class, [
                'required' => false
            ])
            ->add('title', TextType::class, [
                'required' => true
            ])
            ->add('description', TextType::class, [
                'required' => true
            ])

        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'csrf_protection' => false
        ]);
    }
}