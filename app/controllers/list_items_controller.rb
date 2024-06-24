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

  def destroy
    @list_item = ListItem.find(params[:id])
    @list = @list_item.list # Adjust this according to your association

    respond_to do |format|
      if @list_item.destroy
        partial_html = render_to_string(partial: "lists/list_items",
                                        locals: { list: @list, new_list_item: ListItem.new },
                                        formats: [:html])
        format.json { render json: { partial_html: partial_html }, status: :ok }
      else
        partial_html = render_to_string(partial: "lists/list_items",
                                        locals: { list: @list, new_list_item: @list_item },
                                        formats: [:html])
        format.json { render json: { partial_html: partial_html, errors: @list_item.errors.full_messages }, status: :unprocessable_entity }
      end
    end
  end

  def update
    @list_item = ListItem.find(params[:id])
    @list_item.update(list_item_params)
    @list = @list_item.list

    respond_to do |format|
      if @list_item.save
        partial_html = render_to_string(partial: "lists/list_items",
                                        locals: { list: @list, new_list_item: ListItem.new },
                                        formats: [:html])
        format.json { render json: { partial_html: partial_html }, status: :ok }
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
    params.require(:list_item).permit(:name, :list_id, :status)
  end
end
