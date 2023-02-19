<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $fillable = [
        'category_id',
        'meta_title',
        'meta_keyword',
        'meta_descrip',
        'slug',
        'name',
        'description',
        'pengarang',
        'penerbit',
        'qty',
        'image',
        'available',
        'rented',
        'broken',
    ];

    protected $with = ['category'];
    public function category()
    {
        return $this->belongsTo(category::class, 'category_id', 'id');
    }
}
