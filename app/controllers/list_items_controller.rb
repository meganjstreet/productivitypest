class ListItemsController < ApplicationController
  before_action :set_list_item, only: [ :new, :create, :update, :destroy]

  def new
    @list= list_items.new
  end

  def create
    @list_item = List_item.new(list_params)
   if @list_item.save
    redirect_to list_item_path(@list)
    else
      render "new"
    end
  end

def update
    @list_item = List.find(params[:id])

    if @list_item.update(list_params)
    redirect_to list_path(@list_item)
    else
      render "edit"
    end
  end


  def destroy
    @list_item = List_item.find(params[:id])
    @list_item.destroy

    redirect_to list_item_path, status: :see_other
  end

  private

  def list_item_params
    params.require(:list).permit(:morning_routine)
  end
end
