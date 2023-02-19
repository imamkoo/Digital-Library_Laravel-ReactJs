<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->integer('category_id');
            $table->string('meta_title')->nullable();
            $table->string('meta_keyword')->nullable();
            $table->string('meta_descrip')->nullable();
            $table->string('slug');
            $table->string('name');
            $table->mediumText('description')->nullable();
            $table->string('pengarang');
            $table->string('penerbit');
            $table->string('qty');
            $table->string('image')->nullable();
            $table->tinyInteger('available')->default('0')->nullable();
            $table->tinyInteger('rented')->default('0')->nullable();
            $table->tinyInteger('broken')->default('0');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
