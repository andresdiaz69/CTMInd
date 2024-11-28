# View: v_analisis_salarios

## Usa los objetos:
- [[v_ausentimos]]
- [[v_Bonos_Promedio]]
- [[v_esquemas_Manuales_por_empleado]]
- [[v_esquemas_por_cargo]]
- [[v_horas_extras]]
- [[v_MLC_consulta_empleados_activos]]
- [[v_Novasoft_Beneficios]]
- [[v_Novasoft_Novedades_fijas]]
- [[v_Salario_NoVariable_Promedio]]
- [[v_Salario_NoVariable_Promedio_AnoActual]]
- [[v_Salario_NoVariable_Promedio_AnoActual_ConGarantizado]]
- [[v_Salario_NoVariable_Promedio_ConGarantizado]]
- [[v_Salario_Variable_Promedio]]
- [[v_Salario_Variable_Promedio_AnoActual]]
- [[v_Salario_Variable_Promedio_AnoActual_ConGarantizado]]
- [[v_Salario_Variable_Promedio_ConGarantizado]]
- [[vw_Analisis_Salarios_Distribucion]]

```sql
CREATE VIEW [dbo].[v_analisis_salarios] AS
SELECT	Cedula,							Nombres = NombreCompleto,				Fecha_Ingreso,						Codigo_Compañia,				Nombre_Compañia, 
	codigo_marca,						a.nombre_marca,							codigo_centro,						nombre_centro,					codigo_seccion, 
	nombre_seccion,						codigo_departamento,					nombre_departamento,				Codigo_Sucursal,				Nombre_Sucursal, 
	Unidad_Negocio,						Nombre_Unidad_Negocio,					Codigo_Cargo,						Nombre_Cargo,					Codigo_Cargo_Generico, 
	Nombre_Cargo_generico,				Codigo_Cargo_Junta,						Nombre_Cargo_Junta,					email,							Codigo_Departamento_trabajo, 
	Nombre_Departamento_trabajo,		Codigo_Ciudad_trabajo,					Nombre_Ciudad_trabajo,				Codigo_Tipo_Contrato,			Nombre_Tipo_Contrato,
	Fecha_Nacimiento,					genero,									Indicador_salario_variable,			Indicador_comisiones,			Prefijo_Cuenta_contable, 
	Codigo_CNO,							Descripcion_CNO,						Codigo_clase_salario,				Nombre_Clase_salario,			fecha_Ult_Aumento,
	SalarioBasico,						Auxilio_celular,						Auxilio_Movilizacion,				Auxilio_Salud,					Auxilio_Vivienda,	
	Bono_Canasta,						Bono_Gasolina,							SalarioVariablePromedio,			SalarioVariable,				SalarioVariablePromedioAnoActual,
	SalarioVariableAnoActual,			Pension_Vol_Mera_Liberalidad_Beneflex,	AFC_Mera_Liberalidad_Beneflex,

	SalarioVariablePromedioConGarantizado = CASE WHEN SalarioVariablePromedioConGarantizado = SalarioVariablePromedio THEN 0 ELSE SalarioVariablePromedioConGarantizado END,
	SalarioVariableConGarantizado = CASE WHEN SalarioVariableConGarantizado = SalarioVariable THEN 0 ELSE SalarioVariableConGarantizado END,
	SalarioVariablePromedioAnoActualConGarantizado = CASE WHEN SalarioVariablePromedioAnoActualConGarantizado = SalarioVariablePromedioAnoActual THEN 0 ELSE SalarioVariablePromedioAnoActualConGarantizado END,
	SalarioVariableAnoActualConGarantizado = CASE WHEN SalarioVariableAnoActualConGarantizado = SalarioVariableAnoActual THEN 0 ELSE SalarioVariableAnoActualConGarantizado END, 

	Salario_Garantizado,										BonoCanastaOcasionalPromedio=MAX(BonoCanastaOcasional),					BonosFabricaPromedio= MAX(BonosFabrica),
	ValorPromedioExtras,										ValorAusentimos=ISNULL(ValorAusentimos,0),								Porcentaje_Retencion,
	codigo_distribucion=ISNULL(codigo_distribucion,''),			Descripcion_Distribucion=ISNULL(Descripcion_Distribucion,''),
	
	Esquema1= REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(MAX(ISNULL(Esquema1,'')),CHAR(13)+CHAR(10)+'-',''),CHAR(09),''),CHAR(10),''),CHAR(13),''),CHAR(34),''),CHAR(248),''),
	Esquema2= REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(MAX(ISNULL(Esquema2,'')),CHAR(13)+CHAR(10)+'-',''),CHAR(09),''),CHAR(10),''),CHAR(13),''),CHAR(34),''),CHAR(248),''),
	Esquema3= REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(MAX(ISNULL(Esquema3,'')),CHAR(13)+CHAR(10)+'-',''),CHAR(09),''),CHAR(10),''),CHAR(13),''),CHAR(34),''),CHAR(248),''),
	Esquema4= REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(MAX(ISNULL(Esquema4,'')),CHAR(13)+CHAR(10)+'-',''),CHAR(09),''),CHAR(10),''),CHAR(13),''),CHAR(34),''),CHAR(248),''),
	Esquema5= REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(MAX(ISNULL(Esquema5,'')),CHAR(13)+CHAR(10)+'-',''),CHAR(09),''),CHAR(10),''),CHAR(13),''),CHAR(34),''),CHAR(248),''),
	Esquema6= REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(MAX(ISNULL(Esquema6,'')),CHAR(13)+CHAR(10)+'-',''),CHAR(09),''),CHAR(10),''),CHAR(13),''),CHAR(34),''),CHAR(248),''),
	EsquemaManual1= REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(MAX(ISNULL(EsquemaManual1,'')),CHAR(13)+CHAR(10)+'-',''),CHAR(09),''),CHAR(10),''),CHAR(13),''),CHAR(34),''),CHAR(248),''),
	EsquemaManual2= REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(MAX(ISNULL(EsquemaManual2,'')),CHAR(13)+CHAR(10)+'-',''),CHAR(09),''),CHAR(10),''),CHAR(13),''),CHAR(34),''),CHAR(248),''),
	EsquemaManual3= REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(MAX(ISNULL(EsquemaManual3,'')),CHAR(13)+CHAR(10)+'-',''),CHAR(09),''),CHAR(10),''),CHAR(13),''),CHAR(34),''),CHAR(248),''),
	EsquemaManual4= REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(MAX(ISNULL(EsquemaManual4,'')),CHAR(13)+CHAR(10)+'-',''),CHAR(09),''),CHAR(10),''),CHAR(13),''),CHAR(34),''),CHAR(248),''),
	EsquemaManual5= REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(MAX(ISNULL(EsquemaManual5,'')),CHAR(13)+CHAR(10)+'-',''),CHAR(09),''),CHAR(10),''),CHAR(13),''),CHAR(34),''),CHAR(248),''),
	EsquemaManual6= REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(MAX(ISNULL(EsquemaManual6,'')),CHAR(13)+CHAR(10)+'-',''),CHAR(09),''),CHAR(10),''),CHAR(13),''),CHAR(34),''),CHAR(248),'')
FROM
(
	SELECT	a.Cedula,						a.Nombres,								a.apellido1,							a.apellido2,							a.Fecha_Ingreso, 
		a.Codigo_Compañia,					a.Nombre_Compañia,						a.codigo_marca,							a.nombre_marca, 						a.codigo_centro, 
		a.nombre_centro,					a.codigo_seccion,						a.nombre_seccion,						a.codigo_departamento,					a.nombre_departamento, 
		a.Codigo_Sucursal,					a.Nombre_Sucursal,						a.Unidad_Negocio,						a.Nombre_Unidad_Negocio,				a.Codigo_Cargo, 
		a.Nombre_Cargo,						a.Codigo_Cargo_Generico,				a.Nombre_Cargo_generico,				a.Codigo_Cargo_Junta,					a.Nombre_Cargo_Junta,
		a.email,							a.Codigo_Departamento_trabajo,			a.Nombre_Departamento_trabajo,			a.Codigo_Ciudad_trabajo,				a.Nombre_Ciudad_trabajo, 
		a.Codigo_Tipo_Contrato,				a.Nombre_Tipo_Contrato,					a.Fecha_Nacimiento,						a.genero,								a.Indicador_salario_variable,
		a.Indicador_comisiones,				a.Prefijo_Cuenta_contable,				a.Codigo_CNO,							a.Descripcion_CNO,						a.Codigo_clase_salario, 
		a.Nombre_Clase_salario,				a.SalarioBasico,						a.fecha_Ult_Aumento,					c.Esquema1,								c.Esquema2,
		c.Esquema3,							c.Esquema4,								c.Esquema5,								c.Esquema6,								u.ValorAusentimos,
		a.Porcentaje_Retencion,				d.Codigo_Distribucion,					d.Descripcion_Distribucion,				EsquemaManual1=e.Esquema1,				EsquemaManual2=e.Esquema2,
		EsquemaManual3=e.Esquema3,			EsquemaManual4=e.Esquema4,				EsquemaManual5=e.Esquema5,				EsquemaManual6=e.Esquema6,
			
		NombreCompleto = nombres + ' ' +  apellido1 + ' ' +  apellido2,				Auxilio_celular=MAX(ISNULL(f.[Auxilio de Celular],0)),						
		Auxilio_Salud=MAX(ISNULL(f.[Auxilio de Salud],0)),							Auxilio_Vivienda=MAX(ISNULL(f.[Auxilio de Vivienda],0)),
		Salario_Garantizado=MAX(ISNULL(f.[Salario Garantizado],0)),					Bono_Canasta= MAX(ISNULL(b.[Bono Canasta],0)),
		Bono_Gasolina=MAX(ISNULL(b.[Bono Gasolina],0)),								SalarioVariablePromedio= ISNULL(p.SalarioVariablePromedio,0),
		SalarioVariable=ISNULL(v.SalarioVariablePromedio,0),						ValorPromedioExtras= ISNULL(h.ValorPromedioExtras,0),
		Auxilio_Movilizacion=MAX(ISNULL(f.[Auxilio de Movilizacion],0)),			Pension_Vol_Mera_Liberalidad_Beneflex = MAX(ISNULL(f.[Pension Vol Mera Liberalidad Beneflex],0)),
		AFC_Mera_Liberalidad_Beneflex = MAX(ISNULL(f.[AFC Mera Liberalidad Beneflex],0)),

			
		BonoCanastaOcasional= CASE WHEN s.nom_con = 'Bono Canasta Ocasional' THEN ValorPromedio ELSE 0 END,
		BonosFabrica = CASE WHEN s.nom_con = 'Bonos Fabrica' THEN ValorPromedio ELSE 0 END,

		SalarioVariablePromedioAnoActual = ISNULL(pa.SalarioVariablePromedio,0),							SalarioVariableAnoActual=ISNULL(paa.SalarioVariablePromedio,0),
		SalarioVariablePromedioConGarantizado= ISNULL(pg.SalarioVariablePromedio,0),						SalarioVariableConGarantizado=ISNULL(npg.SalarioVariablePromedio,0),
		SalarioVariablePromedioAnoActualConGarantizado=ISNULL(acg.SalarioVariablePromedio,0),				SalarioVariableAnoActualConGarantizado=ISNULL(anpg.SalarioVariablePromedio,0)


	FROM      Novasoft_CT_MM.dbo.v_MLC_consulta_empleados_activos		a
	LEFT JOIN v_Novasoft_Novedades_fijas								f	 ON	a.cedula = f.cod_emp
	LEFT JOIN v_Novasoft_Beneficios										b	 ON	a.cedula = b.cod_emp
	LEFT JOIN v_Salario_Variable_Promedio								p	 ON	p.cod_emp = a.cedula
	LEFT JOIN v_Salario_NoVariable_Promedio								v	 ON	v.cod_emp = a.Cedula
	LEFT JOIN v_Salario_Variable_Promedio_AnoActual						pa	 ON	pa.cod_emp = a.cedula
	LEFT JOIN v_Salario_NoVariable_Promedio_AnoActual					paa	 ON	paa.cod_emp = a.Cedula
		
	LEFT JOIN v_Salario_Variable_Promedio_ConGarantizado				pg	 ON	pg.cod_emp = a.Cedula
	LEFT JOIN v_Salario_NoVariable_Promedio_ConGarantizado				npg  ON npg.cod_emp = a.cedula	
	LEFT JOIN v_Salario_Variable_Promedio_AnoActual_ConGarantizado		acg	 ON acg.cod_emp = a.cedula
	LEFT JOIN v_Salario_NoVariable_Promedio_AnoActual_ConGarantizado	anpg ON anpg.cod_emp =a.cedula

	LEFT JOIN v_Bonos_Promedio											s	 ON	s.cod_emp = a.cedula
	LEFT JOIN v_horas_extras											h	 ON	h.cod_emp = a.cedula
	LEFT JOIN v_esquemas_por_cargo										c	 ON	c.codigoempleado = a.cedula
	LEFT JOIN v_ausentimos												u	 ON	u.cod_emp = a.cedula
	LEFT JOIN vw_Analisis_Salarios_Distribucion							d	 ON	d.cedula = a.cedula
	LEFT JOIN v_esquemas_Manuales_por_empleado							e	 ON e.codigoempleado = a.cedula
	GROUP BY	a.Cedula,					a.Nombres,							a.apellido1,						a.apellido2,						a.Fecha_Ingreso,
		a.Codigo_Compañia, 					a.Nombre_Compañia,					a.codigo_marca,						a.nombre_marca, 					a.codigo_centro,
		a.nombre_centro,					a.codigo_seccion, 					a.nombre_seccion,					a.codigo_departamento,				a.nombre_departamento,
		a.Codigo_Sucursal,					a.Nombre_Sucursal, 					a.Unidad_Negocio,					a.Nombre_Unidad_Negocio,			a.Codigo_Cargo, 
		a.Nombre_Cargo,						a.Codigo_Cargo_Generico,			a.Nombre_Cargo_generico,			a.Codigo_Cargo_Junta,				a.Nombre_Cargo_Junta,
		a.email,							a.Codigo_Departamento_trabajo,		a.Nombre_Departamento_trabajo,		a.Codigo_Ciudad_trabajo,			a.Nombre_Ciudad_trabajo, 
		a.Codigo_Tipo_Contrato,				a.Nombre_Tipo_Contrato,				a.Fecha_Nacimiento,					a.genero,							a.Indicador_salario_variable,
		a.Indicador_comisiones,				a.Prefijo_Cuenta_contable, 			a.Codigo_CNO,						a.Descripcion_CNO,					a.Codigo_clase_salario,
		a.Nombre_Clase_salario,				a.SalarioBasico,					a.fecha_Ult_Aumento,				p.SalarioVariablePromedio,			s.nom_con,
		s.ValorPromedio,					h.ValorPromedioExtras,				c.Esquema1,							c.Esquema2,							c.Esquema3,
		c.Esquema4,							c.Esquema5,							c.Esquema6,							u.ValorAusentimos,					a.Porcentaje_Retencion,
		d.Codigo_Distribucion,				d.Descripcion_Distribucion,			e.Esquema1,							e.Esquema2,							e.Esquema3,
		e.Esquema4,							e.Esquema5,							e.Esquema6,							v.SalarioVariablePromedio,			pa.SalarioVariablePromedio,
		paa.SalarioVariablePromedio,		pg.SalarioVariablePromedio,			npg.SalarioVariablePromedio,		acg.SalarioVariablePromedio,		anpg.SalarioVariablePromedio
) a		
--WHERE Cedula IN ('1010181580','1022957010','52477030')

GROUP BY	Cedula,											Nombres,										apellido1,										apellido2,							
	Fecha_Ingreso,											Codigo_Compañia,								Nombre_Compañia,								codigo_marca,
	a.nombre_marca, 										codigo_centro,									nombre_centro, 									codigo_seccion,
	nombre_seccion,											codigo_departamento, 							nombre_departamento,							Codigo_Sucursal,
	Nombre_Sucursal, 										Unidad_Negocio, 								Nombre_Unidad_Negocio, 							Codigo_Cargo,
	Nombre_Cargo, 											Codigo_Cargo_Generico, 							Nombre_Cargo_generico, 							Codigo_Cargo_Junta,
	Nombre_Cargo_Junta,										email, 											Codigo_Departamento_trabajo,					Nombre_Departamento_trabajo,
	Codigo_Ciudad_trabajo,									Nombre_Ciudad_trabajo,							Codigo_Tipo_Contrato,							Nombre_Tipo_Contrato,
	Fecha_Nacimiento,										genero,											Indicador_salario_variable,						Indicador_comisiones,
	Prefijo_Cuenta_contable,								Codigo_CNO,										Descripcion_CNO,								Codigo_clase_salario,
	Nombre_Clase_salario,									SalarioBasico,									fecha_Ult_Aumento,								Auxilio_celular,
	Auxilio_Movilizacion,									Auxilio_Salud,									Auxilio_Vivienda,								Salario_Garantizado,
	Bono_Canasta,											Bono_Gasolina,									SalarioVariablePromedio,						SalarioVariable,
	SalarioVariablePromedioAnoActual,						SalarioVariableAnoActual,						SalarioVariablePromedioConGarantizado,			SalarioVariableConGarantizado,
	SalarioVariablePromedioAnoActualConGarantizado,			SalarioVariableAnoActualConGarantizado,			ValorPromedioExtras,							ValorAusentimos,
	Porcentaje_Retencion,									codigo_distribucion,							Descripcion_Distribucion,						NombreCompleto,
	Pension_Vol_Mera_Liberalidad_Beneflex,					AFC_Mera_Liberalidad_Beneflex
--ORDER BY Cedula

```
