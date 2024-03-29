import { useState } from 'react'
import { InputGroup, Form } from 'react-bootstrap';
import { productAction } from '@/store/slices/product.slice';
import { uploadToFirebase } from '@services/firebase'
import api from '@services/apis'
import { Modal, message } from 'antd';
import { useSelector } from 'react-redux';
import { Store } from '@/store';

export default function ProductCreateForm({ dispatch }: any) {
  const [picturesPreview, setPicturesPreview] = useState<any>([]);
  const categoryStore = useSelector((store: Store) => store.categoryStore)
  const brandStore = useSelector((store: Store) => store.brandStore)

  async function handleAddProduct(e: any) {
    e.preventDefault();
    try {
      let newProduct = {
        name: (e.target as any).name.value,
        price: Number((e.target as any).price.value),
        avatar: await uploadToFirebase((e.target as any).avatar.files[0], ''),
        categoryId: Number((e.target as any).categoryId.value),
        des: (e.target as any).des.value,
        brandId: Number((e.target as any).brandId.value),
      }

      if (!picturesPreview.length) return
      let pictures = [];

      for (let i in picturesPreview) {
        let url = await uploadToFirebase(picturesPreview[i].file, '')
        pictures.push({
          url
        })
      }
      
      let result = await api.product.create({
        newProduct,
        pictures
      })

      console.log('a', result);

      Modal.success({
        title: "Thông báo",
        content: "Bạn đã thêm sản phẩm thành công!",
        onOk: () => {
          dispatch(productAction.addData(result.data.data));
          (e.target as any).name.value = "";
          (e.target as any).price.value = "";
          setPicturesPreview([]);
          (e.target as any).avatar.value = null;
          dispatch(productAction.loadModal());
        }
      });

    } catch (err) {
      console.log("err", err)
      alert("1")
    }
  }
  return (
    <div className='product_create_form'>
      <form onSubmit={(e) => {
        handleAddProduct(e)
      }}>
        <div className='btn_box'>
          <span>Create Product</span>
          <button onClick={() => {
            dispatch(productAction.loadModal())
          }} type='button' className='btn btn-danger'>X</button>
        </div>
        <InputGroup className="mb-3">
          <InputGroup.Text style={{ width: "80px" }} id="basic-addon1">Name</InputGroup.Text>
          <Form.Control
            placeholder="Product Name"
            name='name'
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text style={{ width: "80px" }} id="basic-addon1">Price</InputGroup.Text>
          <Form.Control
            placeholder="Product Price"
            name='price'
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text style={{ width: "80px" }} id="basic-addon1">Avatar</InputGroup.Text>
          <div className='input_avatar'>
            <img src="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg" />
            <input onChange={(e) => {
              if ((e.target as any).files.length > 0) {
                let spanEl = (e.target as any).parentNode.querySelector('span');
                let imgEl = (e.target as any).parentNode.querySelector('img');
                spanEl.style.opacity = 0;
                imgEl.src = URL.createObjectURL((e.target as any).files[0])
              }
            }} name='avatar' type="file" />
            <span>+</span>
          </div>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text style={{ width: "80px" }} id="basic-addon1">Describe</InputGroup.Text>
          <Form.Control
            as="textarea"
            placeholder="Describe"
            name='des'
          />
        </InputGroup>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Picture List</Form.Label>
          <Form.Control onChange={(e) => {
            let tempArr = [];
            if ((e.target as any).files.length > 0) {
              for (let i in (e.target as any).files) {
                if (i == "length") {
                  break
                }
                tempArr.push({
                  url: URL.createObjectURL((e.target as any).files[i]),
                  file: (e.target as any).files[i]
                })
              }
            }
            console.log('vao', picturesPreview.length + tempArr.length);
            
            if (picturesPreview.length + tempArr.length > 4) {
              alert("max size 4")
              return
            }
            setPicturesPreview([...tempArr, ...picturesPreview])
          }} type="file" multiple max={4} />
        </Form.Group>
        <div className='pictures'>
          {
            picturesPreview.map((item: any, index: number) => (
              <div key={Date.now() * Math.random()} className='item'>
                <img src={item.url} />
                <button type='button' onClick={() => {
                  setPicturesPreview(picturesPreview?.filter((indexFilter: any) => {
                    console.log('e', indexFilter);
                    console.log('esss', index);
                    
                    indexFilter != index
                  }))
                  console.log('pr',picturesPreview);
                  
                }} className='btn btn-danger'>X</button>
              </div>
            ))
          }
        </div>
        <InputGroup className="mb-3">
          <InputGroup.Text style={{ width: "80px" }} id="basic-addon1">Category</InputGroup.Text>
          <Form.Select name='categoryId' aria-label="Default select example">
            <option value={null as any}>Please choose</option>
            {
              categoryStore?.data?.map((item: any) => (
                <option key={Date.now() * Math.random()} value={item.id}>{item.title}</option>
              ))
            }
          </Form.Select>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text style={{ width: "80px" }} id="basic-addon1">Brand</InputGroup.Text>
          <Form.Select name='brandId' aria-label="Default select example">
            <option value={null as any}>Please choose</option>
            {
              brandStore?.data?.map(item => (
                <option key={Date.now() * Math.random()} value={item.id}>{item.title}</option>
              ))
            }
          </Form.Select>
        </InputGroup>
        <button type='submit' className='btn btn-success'>save</button>
      </form>
    </div>
  )
}