# View: vw_Spiga_MovimientoContableTercero

## Usa los objetos:
- [[spiga_ContabilidadMovimientos]]

```sql
CREATE view [dbo].[vw_Spiga_MovimientoContableTercero] as
select   cant= row_number() over (partition by CodigoTercero order by CodigoTercero),fechaasiento,
Empresa,NombreEmpresa,Cuenta,CodigoTercero,Debe=sum(debe),Haber=sum(haber),saldo= sum(debe)-sum(haber),
Centro,NombreCentro​,Seccion,NombreSeccion,Departamento,NombreDepartamento,Marca,NombreMarca
from(​
	select  Empresa=idEmpresas,NombreEmpresa,a.FechaAsiento,Cuenta,centro,NombreCentro,centroAux,NombreCentroAux,Seccion,NombreSeccion,
	SeccionAux,NombreSeccionAux,Departamento,NombreDepartamento,DepartamentoAux, NombreDepartamentoAux,
	marca,NombreMarca,Concepto,CONVERT(money, debe) AS Debe, CONVERT(money, haber) AS Haber,CodigoTercero
	FROM	[PSCService_DB].dbo.spiga_ContabilidadMovimientos 	a	 with(nolock)	
 )a​ 
--where Empresa = 6
--and FechaAsiento >= '20200101'
--and FechaAsiento <= '20200331'
--and cuenta = '2805051110'
--and CodigoTercero = '15173'
group by Empresa,NombreEmpresa,Cuenta,CodigoTercero,Centro,NombreCentro​,Seccion,NombreSeccion,Departamento,NombreDepartamento,Marca,NombreMarca,fechaasiento


```
