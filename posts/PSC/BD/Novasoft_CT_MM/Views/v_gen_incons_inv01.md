# View: v_gen_incons_inv01

## Usa los objetos:
- [[cxc_cliente]]
- [[cxc_contcli_entpub]]
- [[cxc_succli]]
- [[cxp_provee]]
- [[cxp_sucprov]]
- [[gen_actividad]]
- [[gen_cajas]]
- [[gen_ccosto]]
- [[gen_ciudad]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_deptos]]
- [[gen_paises]]
- [[gen_retencion]]
- [[gen_subtipodoc]]
- [[gen_sucursal]]
- [[gen_terceros]]
- [[gen_vendedor]]
- [[inv_bodegas]]
- [[inv_conceptos]]
- [[inv_cuedoc]]
- [[inv_inf_inv]]
- [[inv_items]]
- [[inv_listas]]
- [[inv_tabconv]]

```sql

/*AFLOREZ ENERO/2021 SRS2021-1216 Se agrega validación con el número de contrato*/
CREATE VIEW [dbo].[v_gen_incons_inv01]
AS
SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cliente)+' Cliente no existe' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE cliente NOT IN (SELECT cod_cli 
						FROM cxc_cliente WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(provee)+' Proveedor no existe' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE provee NOT IN (SELECT provee 
						FROM cxp_provee WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_cl1)+' Clasific 1 no existe' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE cod_cl1 NOT IN (SELECT codigo 
						FROM gen_clasif1 WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_cl3)+' Clasific 2 no existe' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE cod_cl2 NOT IN (SELECT codigo 
						FROM gen_clasif2 WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_cl3)+' Clasific 3 no existe' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE cod_cl3 NOT IN (SELECT codigo 
						FROM gen_clasif3 WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_cco)+' Ccosto  no existe' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE cod_cco NOT IN (SELECT cod_cco 
						FROM gen_ccosto WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_suc)+' Sucursal  no existe' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE cod_suc NOT IN (SELECT cod_suc 
						FROM gen_sucursal WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(suc_des)+' Sucursal Destino no existe' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE suc_des NOT IN (SELECT cod_suc 
						FROM gen_sucursal WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(sub_tip)+' Subtipo documento no existe' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE sub_tip NOT IN (SELECT cod_sub 
						FROM gen_subtipodoc WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(bodega)+' Bodega no existe' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE bodega NOT IN (SELECT cod_bod 
						FROM inv_bodegas WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(bodega)+' Bodega no pertenece a la sucursal del documento' AS error 
FROM inv_inf_inv  WITH(NOLOCK)
WHERE bodega+cod_suc NOT IN 
		(SELECT cod_bod+cod_suc 
			FROM inv_bodegas WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(bod_des)+' Bodega destino no pertenece a la sucursal destino' AS error 
FROM inv_inf_inv  WITH(NOLOCK)
WHERE bod_des+suc_des
		NOT IN (SELECT cod_bod+cod_suc 
					FROM inv_bodegas WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(item)+' Item no existe' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE item NOT IN (SELECT cod_item 
					FROM inv_items WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(vendedor)+' Vendedor no existe' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE vendedor NOT IN (SELECT cod_ven 
						FROM gen_vendedor WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_caja)+' Caja no existe' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE cod_caja NOT IN (SELECT cod_caj 
						FROM gen_cajas WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(lista)+' Lista no existe' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE lista NOT IN (SELECT cod_lis 
					FROM inv_listas WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(fac_con)+' Factor de conversión no existe' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE RTRIM(item)+RTRIM(fac_con) 
	NOT IN (SELECT RTRIM(cod_item)+RTRIM(cod_con) 
				FROM inv_tabconv WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc,RTRIM(cod_ter)+' Tercero no existe' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE cod_ter NOT IN (SELECT ter_nit 
						FROM gen_terceros WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc,reg_doc,RTRIM(cod_ret)+' Código de retención no existe' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE cod_ret NOT IN (SELECT cod_ret 
						FROM gen_retencion WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc,reg_doc,RTRIM(pai_doc)+' Código de país no existe' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE pai_doc NOT IN (SELECT cod_pai 
						FROM gen_paises WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc,reg_doc,RTRIM(dep_doc)+' Código de departamento no existe o no pertenece al país del registro' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE pai_doc+dep_doc NOT IN (SELECT cod_pai+cod_dep 
								FROM gen_deptos WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc,reg_doc,RTRIM(ciu_doc)+' Código de ciudad no existe o no pertenece al deparmento del registro' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE pai_doc+dep_doc+ciu_doc NOT IN (SELECT cod_pai+cod_dep+ciu_doc 
										FROM gen_ciudad WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc,reg_doc,RTRIM(cod_ica)+' Código de ICA no existe en la ciudad del documento' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE RTRIM(cod_ica) NOT IN (SELECT RTRIM(cod_act) 
								FROM gen_actividad WITH(NOLOCK))

UNION  ALL

SELECT ano_doc,per_doc,sub_tip,num_doc,reg_doc,RTRIM(suc_cli)+' Código de sucursal de cliente no existe' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE RTRIM(suc_cli)+RTRIM(cliente) 
	NOT IN (SELECT RTRIM(suc_cli)+RTRIM(cod_cli) 
				FROM cxc_succli WITH(NOLOCK))

UNION  ALL

SELECT ano_doc,per_doc,sub_tip,num_doc,reg_doc,RTRIM(suc_prov)+' Código de sucursal de proveedor no existe' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE RTRIM(suc_prov)+RTRIM(provee) 
	NOT IN (SELECT RTRIM(suc_pro)+RTRIM(cod_pro) 
		FROM cxp_sucprov WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc,reg_doc,RTRIM(cod_con)+' Código de concepto no existe' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE cod_con NOT IN (SELECT cod_con 
						FROM inv_conceptos WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc,reg_doc,'Pedido a despachar inexistente' AS error
FROM inv_inf_inv WITH(NOLOCK)
WHERE pedido <>'0'
	AND tip_doc = '006'
	AND ano_ped+per_ped+sub_ped+pedido NOT IN (SELECT ano_doc+per_doc+sub_tip+num_doc 
												FROM inv_cuedoc  WITH(NOLOCK)
												WHERE tip_doc='005')

UNION ALL

SELECT a.ano_doc, a.per_doc, a.sub_tip, a.num_doc, a.reg_doc,'Cantidad a despachar mayor al saldo del pedido' AS error
FROM inv_inf_inv AS a WITH(NOLOCK)
	INNER JOIN inv_cuedoc AS b WITH(NOLOCK) ON b.ano_doc=a.ano_ped AND b.per_doc=a.per_ped AND b.sub_tip=a.sub_ped AND b.num_doc=a.pedido AND b.reg_doc=a.reg_ped
	INNER JOIN inv_items AS ite WITH(NOLOCK) ON ite.cod_item=a.item
WHERE a.tip_doc='006'
	AND a.cantidad>(b.sal_ped+b.cantidad *ISNULL((1+ite.tol_des/100),1))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc,reg_doc,'Orden de compra a despachar inexistente' AS error
FROM inv_inf_inv WITH(NOLOCK)
WHERE pedido <>'0'
	AND tip_doc = '008'
	AND ano_ped+per_ped+sub_ped+pedido 
		NOT IN (SELECT ano_doc+per_doc+sub_tip+num_doc 
				FROM inv_cuedoc WITH(NOLOCK) 
				WHERE tip_doc='007')

UNION ALL

SELECT a.ano_doc, a.per_doc, a.sub_tip, a.num_doc, a.reg_doc,'Cantidad a despachar mayor al saldo de la orden de compra' AS error
FROM inv_inf_inv AS a WITH(NOLOCK)
	INNER JOIN inv_cuedoc AS b WITH(NOLOCK) ON b.ano_doc=a.ano_ped AND b.per_doc=a.per_ped AND b.sub_tip=a.sub_ped AND b.num_doc=a.pedido AND b.reg_doc=a.reg_ped
WHERE a.tip_doc='008'
	AND a.cantidad>b.sal_ped

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc,reg_doc,'Despacho inexistente' AS error
FROM inv_inf_inv WITH(NOLOCK)
WHERE despa <>'0'
	AND tip_doc IN ('010','110')
	AND ano_des+per_des+sub_des+despa 
		NOT IN (SELECT ano_doc+per_doc+sub_tip+num_doc 
				FROM inv_cuedoc WITH(NOLOCK))

UNION ALL

SELECT a.ano_doc, a.per_doc, a.sub_tip, a.num_doc, a.reg_doc,'Cantidad a facturar mayor al saldo del despacho' AS error
FROM inv_inf_inv AS a WITH(NOLOCK)
	INNER JOIN inv_cuedoc AS b WITH(NOLOCK) ON b.ano_doc=a.ano_des AND b.per_doc=a.per_des AND b.sub_tip=a.sub_des AND b.num_doc=a.despa AND b.reg_doc=a.reg_des
WHERE a.tip_doc IN ('010','110')
	AND a.cantidad>b.des_ped

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc,reg_doc,'Factura de venta inexistente' AS error
FROM inv_inf_inv WITH(NOLOCK)
WHERE despa <>'0'
	AND tip_doc = '302'
	AND ano_des+per_des+sub_des+despa NOT IN (SELECT ano_doc+per_doc+sub_tip+num_doc 
												FROM inv_cuedoc WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc,reg_doc,'Factura de compra inexistente' AS error
FROM inv_inf_inv WITH(NOLOCK)
WHERE despa <>'0'
	AND tip_doc = '301'
	AND ano_des+per_des+sub_des+despa NOT IN (SELECT ano_doc+per_doc+sub_tip+num_doc 
												FROM inv_cuedoc WITH(NOLOCK))

UNION ALL

SELECT inf.ano_doc,inf.per_doc,inf.sub_tip,inf.num_doc, inf.reg_doc, RTRIM(inf.item)+' El Item se encuentra inactivo' AS error 
FROM inv_inf_inv AS inf WITH(NOLOCK)
	INNER JOIN inv_items AS ite WITH(NOLOCK) ON ite.cod_item=inf.item
WHERE ite.cod_est = 0

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc,'El Número de Contrato '+RTRIM(num_ctr)+' no existe para el cliente seleccionado' AS error 
FROM inv_inf_inv WITH(NOLOCK)
WHERE RTRIM(LTRIM(num_ctr))+RTRIM(LTRIM(cliente)) NOT IN (SELECT RTRIM(LTRIM(num_ctr))+RTRIM(LTRIM(cod_cli)) 
															FROM cxc_contcli_entpub WITH(NOLOCK));

```
