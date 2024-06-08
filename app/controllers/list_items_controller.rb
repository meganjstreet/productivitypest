class ListItemsController < ApplicationController
  def create
    @list = List.find(params[:list_id])
    @list_item = ListItem.new(list_item_params)
    @list_item.list = @list

    respond_to do |format|
      if @list_item.save
        partial_html = render_to_string(partial: "lists/list_items",
                                        locals: { list: @list, new_list_item: ListItem.new },
                                        formats: [:html])
        format.json { render json: { partial_html: partial_html }, status: :created }
      else
        partial_html = render_to_string(partial: "lists/list_items",
                                        locals: { list: @list, new_list_item: @list_item },
                                        formats: [:html])
        format.json { render json: { partial_html: partial_html, errors: @list_item.errors.full_messages }, status: :unprocessable_entity }
      end
    end
  end

  private

  def list_item_params
    params.require(:list_item).permit(:name, :list_id)
  end
end
