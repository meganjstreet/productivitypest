class ListsController < ApplicationController
  before_action :set_list, only: [ :new, :create, :update, :destroy]

  def new
    @list= List.new
  end

  def create
    @list = List.new(list_params)
   if @list.save
    redirect_to list_path(@list)
    else
      render "new"
    end
  end

def update
    @list = List.find(params[:id])

    if @list.update(list_params)
    redirect_to list_path(@list)
    else
      render "edit"
    end
  end


  def destroy
    @list = List.find(params[:id])
    @list.destroy

    redirect_to list_path, status: :see_other
  end

  private

  def list_params
    params.require(:list).permit(:morning_routine)
  end
end
