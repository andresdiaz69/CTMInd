# View: v_SegurosVehiculos

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[ComisionesSpigaVO]]
- [[spiga_VehiculosSeguros]]

```sql
CREATE view [dbo].[v_SegurosVehiculos] as
select s.Ano_Periodo,            s.Mes_Periodo,      s.FechaDeCorte,     s.IdVehiculoSeguros,  s.IdSeguroTipos,
       s.DescripcionSeguroTipos, s.FechaAlta,        s.FechaVencimiento, s.Importe,            s.NumeroPoliza,
	   s.IdVehiculos,            s.vin,              s.matricula,
	   idMarcas = case when isnull(v.Centro,o.centro) like 'VO-%' then 99 
	                   else s.IdMarcas end ,
       NombreMarca = case when isnull(v.Centro,o.centro) like 'VO-%' then 'Usados' 
	                      else s.NombreMarca end ,
       s.IdGamas,                s.NombreGama,       s.CodModelo,        s.AñoModelo,          s.NombreModelo,
       s.IdTerceros_Propietario, s.NifCif,s.nombre,  s.Apellido1,        s.Apellido2,          s.IdTerceros,
	   s.NombreSeguro,           s.NombreEmpleado,   s.NombreCentroComprasVN,                  s.NombreCentroVO,
       CentroVenta=isnull(v.Centro,o.centro)
  from (select s.Ano_Periodo,            s.Mes_Periodo,            s.FechaDeCorte,     s.IdVehiculoSeguros,       s.IdSeguroTipos,
               s.DescripcionSeguroTipos, s.FechaAlta,              s.FechaVencimiento, s.Importe,                 s.NumeroPoliza,
	           s.IdVehiculos,            s.vin,                    s.matricula,        s.IdGamas,                 s.NombreGama,   
			   s.CodModelo,              s.AñoModelo,              s.NombreModelo,     s.IdTerceros_Propietario,  s.NifCif,
			   s.nombre,                 s.Apellido1,              s.Apellido2,        s.IdTerceros,	          s.NombreSeguro, 
			   s.NombreEmpleado,         s.NombreCentroComprasVN,  s.NombreCentroVO,   s.NombreMarca,             s.IdMarcas ,
			   orden = ROW_NUMBER() over(partition by s.VIN,IdSeguroTipos  order by s.FechaAlta desc)
          from [PSCService_DB].dbo.spiga_VehiculosSeguros  s  )  s
  left join (select vin,Centro,EntregaEfectiva,nit, max(Ano_Periodo) m 
               from [DBMLC_0190].dbo.ComisionesSpigaVN
			  group by vin,Centro,EntregaEfectiva,nit)     v      on v.vin = s.VIN   
                                                            and s.NifCif = v.Nit
  left join (select vin,Centro,EntregaEfectiva,nit, max(Ano_Periodo) m 
               from [DBMLC_0190].dbo.ComisionesSpigaVo
			  group by vin,Centro,EntregaEfectiva,nit)     o      on o.vin = s.VIN 
			                                                 and s.NifCif = o.Nit
 where  (v.EntregaEfectiva = 1 or o.EntregaEfectiva = 1)
   and orden = 1
 --and s.NombreMarca  = 'FORD'4	Poliza Contra Todo Riesgo
 --and s.Ano_Periodo = 2019
 --and s.Mes_Periodo = 9
 --  and s.vin =  'VF1RZG002PC377457'
 --and isnull(v.Centro,o.centro) like 'VO-%'
--order by s.matricula 

```
